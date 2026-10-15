import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

/*
 * Escena three.js del logotipo «Flamingos».
 *
 * El SVG trae tres capas idénticas desplazadas (blanca, azul y rosa). Aquí la
 * blanca se extruye como letra 3D y las otras dos se colocan detrás, en
 * profundidad, para que el rotulado original se convierta en un volumen real.
 *
 * Intro: tubos de neón que se dibujan letra a letra → las caras se encienden
 * con parpadeo → las capas azul y rosa salen hacia atrás mientras el logo gira
 * a su posición. Después flota, sigue al puntero y parpadea de vez en cuando.
 *
 * El bloom es selectivo (capa BLOOM_LAYER): solo brillan los tubos, para no
 * quemar el blanco del logo. El lienzo es
 * transparente: un último pase convierte el brillo en alfa para que el halo
 * (que no escribe alfa) se vea sobre el fondo de la página.
 */

const PINK = 0xf72280;
const BLUE = 0x84c4e9;
const VIEW_W = 447;
const VIEW_H = 148;
/** Desplazamientos de las capas en el SVG original. */
const BLUE_OFFSET = new THREE.Vector2(1.85, 4.62);
const PINK_OFFSET = new THREE.Vector2(0, 9.24);
const FACE_DEPTH = 5;
const LAYER_GAP = 6;
const BLOOM_LAYER = 1;

const INTRO = {
  tubeStart: 0.15,
  tubeStagger: 0.11,
  tubeDur: 0.75,
  faceStart: 1.05,
  faceStagger: 0.07,
  faceDur: 0.4,
  extrudeStart: 1.75,
  extrudeDur: 0.9,
  end: 2.8,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t: number) => {
  const c1 = 1.5, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
/** Patrón de encendido de un tubo de neón (0 = apagado, 1 = encendido). */
const flicker = (t: number) => {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const steps = [1, 0, 0.6, 0, 0, 1, 0.3, 1, 1, 0.8, 1, 1];
  return steps[Math.floor(t * steps.length)];
};

type Letter = {
  face: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshStandardMaterial>;
  tubes: Line2[];
  segments: number[];
  minX: number;
  glitchUntil: number;
};

export type NeonScene = {
  setPointer: (x: number, y: number) => void;
  resize: () => void;
  setActive: (active: boolean) => void;
  dispose: () => void;
};

export function createNeonScene(
  canvas: HTMLCanvasElement,
  svgText: string,
  opts: { reducedMotion: boolean; bleed: { x: number; y: number }; onFirstFrame: () => void },
): NeonScene {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NoToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 10, 4000);

  scene.add(new THREE.AmbientLight(0xffffff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-0.4, 0.8, 1);
  scene.add(key);
  const rimPink = new THREE.PointLight(PINK, 60000, 0, 2);
  rimPink.position.set(-260, -60, 120);
  scene.add(rimPink);
  const rimBlue = new THREE.PointLight(BLUE, 60000, 0, 2);
  rimBlue.position.set(260, 80, 120);
  scene.add(rimBlue);

  // Pivote centrado en el logo; dentro, el SVG con el eje Y invertido.
  const pivot = new THREE.Group();
  scene.add(pivot);
  const logo = new THREE.Group();
  logo.scale.y = -1;
  logo.position.set(-VIEW_W / 2, VIEW_H / 2, 0);
  pivot.add(logo);

  // ── Geometría a partir de la capa blanca del SVG ──
  const data = new SVGLoader().parse(svgText);
  const letterShapes = data.paths
    .filter(p => p.color.getHex() === 0xffffff)
    .map(p => p.toShapes());

  const extrude = (shapes: THREE.Shape[], depth: number) =>
    new THREE.ExtrudeGeometry(shapes, {
      depth,
      bevelEnabled: true,
      bevelThickness: 1.2,
      bevelSize: 0.7,
      bevelSegments: 3,
      curveSegments: 10,
    });

  const lineMaterials: LineMaterial[] = [];
  const disposables: { dispose: () => void }[] = [];

  const letters: Letter[] = letterShapes.map(shapes => {
    const geo = extrude(shapes, FACE_DEPTH);
    geo.computeBoundingBox();
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.05,
    });
    const face = new THREE.Mesh(geo, mat);
    logo.add(face);
    disposables.push(geo, mat);

    // Tubos de neón: contorno exterior + agujeros, justo delante de la cara.
    const tubes: Line2[] = [];
    const segments: number[] = [];
    for (const shape of shapes) {
      for (const loop of [shape, ...shape.holes]) {
        const pts = loop.getSpacedPoints(Math.max(40, Math.round(loop.getLength() / 2)));
        const positions = pts.flatMap(p => [p.x, p.y, FACE_DEPTH + 1.6]);
        const lg = new LineGeometry();
        lg.setPositions(positions);
        const lm = new LineMaterial({ color: PINK, linewidth: 2.4, transparent: true, depthWrite: false, side: THREE.DoubleSide });
        lineMaterials.push(lm);
        const line = new Line2(lg, lm);
        line.renderOrder = 2;
        line.layers.enable(BLOOM_LAYER);
        logo.add(line);
        tubes.push(line);
        segments.push(pts.length - 1);
        disposables.push(lg, lm);
      }
    }
    return { face, tubes, segments, minX: geo.boundingBox!.min.x, glitchUntil: 0 };
  });
  // El SVG trae las letras de derecha a izquierda: las ordenamos para la intro.
  letters.sort((a, b) => a.minX - b.minX);

  // Capas azul y rosa: un único volumen cada una, detrás de la cara blanca.
  const allShapes = letterShapes.flat();
  const makeLayer = (color: number) => {
    const geo = extrude(allShapes, LAYER_GAP - 1.5);
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.55, roughness: 0.5 });
    const mesh = new THREE.Mesh(geo, mat);
    logo.add(mesh);
    disposables.push(geo, mat);
    return mesh;
  };
  const blue = makeLayer(BLUE);
  const pink = makeLayer(PINK);

  // ── Post-procesado: bloom selectivo para el halo de neón ──
  const bloomComposer = new EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1, 0.12, 0);
  bloomComposer.addPass(bloom);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const mixPass = new ShaderPass(
    {
      uniforms: { tDiffuse: { value: null }, tBloom: { value: null } },
      vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform sampler2D tBloom;
        varying vec2 vUv;
        void main() {
          vec4 base = texture2D(tDiffuse, vUv);
          gl_FragColor = vec4(base.rgb + texture2D(tBloom, vUv).rgb, base.a);
        }`,
    },
    "tDiffuse",
  );
  // ShaderPass clona los uniforms, así que la textura del bloom se asigna después.
  mixPass.uniforms.tBloom.value = bloomComposer.renderTarget2.texture;
  composer.addPass(mixPass);
  composer.addPass(new OutputPass());
  // Alfa = luminosidad (como luz aditiva) con color premultiplicado.
  composer.addPass(
    new ShaderPass({
      uniforms: { tDiffuse: { value: null } },
      vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          vec4 c = texture2D(tDiffuse, vUv);
          // Funde el halo hacia los bordes para que nunca se vea el rectángulo del lienzo.
          vec2 e = min(vUv, 1.0 - vUv);
          float edge = smoothstep(0.0, 0.1, e.x) * smoothstep(0.0, 0.22, e.y);
          // Fuera de las letras recorta la neblina más tenue del bloom.
          vec3 halo = max(c.rgb - 0.05, 0.0) * 1.05 * edge;
          vec3 rgb = mix(halo, c.rgb, c.a);
          float a = clamp(max(c.a, max(rgb.r, max(rgb.g, rgb.b))), 0.0, 1.0);
          gl_FragColor = vec4(min(rgb, vec3(a)), a);
        }`,
    }),
  );

  // ── Estado ──
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const timer = new THREE.Timer();
  let time = opts.reducedMotion ? INTRO.end : 0;
  let nextGlitch = INTRO.end + 3;
  let raf = 0;
  let active = true;
  let firstFrame = true;

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    bloomComposer.setSize(w, h);
    for (const m of lineMaterials) m.resolution.set(w, h);
    camera.aspect = w / h;
    // La altura visible en z=0 coincide con la caja del logo + el margen del lienzo.
    const visibleH = VIEW_H * (1 + 2 * opts.bleed.y);
    camera.position.set(0, 0, visibleH / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    // Los tubos se escalan con el tamaño del logo en pantalla.
    for (const m of lineMaterials) m.linewidth = Math.max(1.4, (w / (VIEW_W * (1 + 2 * opts.bleed.x))) * 2.6);
  }

  function update(t: number) {
    const intro = t < INTRO.end;

    // Tubos que se dibujan letra a letra.
    letters.forEach((l, i) => {
      const p = easeOutCubic(clamp01((t - INTRO.tubeStart - i * INTRO.tubeStagger) / INTRO.tubeDur));
      l.tubes.forEach((tube, j) => {
        (tube.geometry as LineGeometry).instanceCount = Math.ceil(p * l.segments[j]);
        tube.visible = p > 0;
      });

      // Cara: parpadeo de encendido y, después, algún fallo ocasional.
      const on = flicker((t - INTRO.faceStart - i * INTRO.faceStagger) / INTRO.faceDur);
      const glitch = t < l.glitchUntil ? flicker(1 - (l.glitchUntil - t) / 0.45) : 1;
      const lit = on * glitch;
      l.face.visible = lit > 0.05;
      l.face.material.emissiveIntensity = 0.25 + 0.5 * (1 - clamp01((t - INTRO.faceStart - i * INTRO.faceStagger - INTRO.faceDur) / 0.6)) * lit;
      // Con la cara encendida el tubo queda como un ribete suave.
      // Con la cara encendida el tubo se hunde en el volumen y queda solo el
      // ribete exterior brillando alrededor de la letra.
      for (const tube of l.tubes) {
        tube.position.z = -3.2 * on;
        (tube.material as LineMaterial).opacity = 0.35 + 0.65 * glitch;
      }
    });

    // Extrusión: azul y rosa salen hacia atrás.
    const e = easeOutBack(clamp01((t - INTRO.extrudeStart) / INTRO.extrudeDur));
    blue.position.set(BLUE_OFFSET.x * e, BLUE_OFFSET.y * e, -LAYER_GAP * e);
    pink.position.set(PINK_OFFSET.x * e, PINK_OFFSET.y * e, -2 * LAYER_GAP * e);
    blue.visible = pink.visible = e > 0.001;

    // Giro: de escorado a la posición de reposo, luego flotación + puntero.
    const settle = easeOutCubic(clamp01((t - 0.2) / (INTRO.end - 0.2)));
    const idle = opts.reducedMotion ? 0 : clamp01((t - INTRO.end + 0.6) / 1.2);
    pointer.sx += (pointer.x - pointer.sx) * 0.06;
    pointer.sy += (pointer.y - pointer.sy) * 0.06;
    pivot.rotation.y = (1 - settle) * -0.85 + idle * (Math.sin(t * 0.55) * 0.1 + pointer.sx * 0.32);
    pivot.rotation.x = (1 - settle) * 0.45 + idle * (Math.sin(t * 0.8) * 0.05 + pointer.sy * 0.22);
    pivot.position.y = idle * Math.sin(t * 1.1) * 2;
    pivot.scale.setScalar(0.86 + 0.14 * settle);

    // Halo: pico durante el encendido y respiración suave después.
    bloom.strength = intro
      ? 1 + 0.6 * Math.sin(Math.PI * clamp01(t / INTRO.end))
      : 0.6 + Math.sin(t * 1.6) * 0.1;

    // Fallo de neón aleatorio en una letra.
    if (!opts.reducedMotion && t > nextGlitch) {
      letters[Math.floor(Math.random() * letters.length)].glitchUntil = t + 0.45;
      nextGlitch = t + 4 + Math.random() * 6;
    }
  }

  function frame() {
    raf = 0;
    if (!active) return;
    timer.update();
    time += Math.min(timer.getDelta(), 1 / 20);
    update(time);
    camera.layers.set(BLOOM_LAYER);
    bloomComposer.render();
    camera.layers.set(0);
    composer.render();
    if (firstFrame) {
      firstFrame = false;
      opts.onFirstFrame();
    }
    if (!opts.reducedMotion) raf = requestAnimationFrame(frame);
  }

  resize();
  frame();

  return {
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    resize() {
      resize();
      if (opts.reducedMotion) frame();
    },
    setActive(next) {
      if (next === active) return;
      active = next;
      if (active && !raf) {
        timer.update();
        frame();
      }
    },
    dispose() {
      active = false;
      cancelAnimationFrame(raf);
      disposables.forEach(d => d.dispose());
      composer.dispose();
      bloomComposer.dispose();
      renderer.dispose();
    },
  };
}
