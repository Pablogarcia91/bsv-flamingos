"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import wordmark from "@/public/brand/flamingos-wordmark.svg";
import { cn } from "@/lib/utils";

/** Cuánto sobresale el lienzo respecto a la caja del logo (para el giro y el halo). */
const CANVAS_BLEED = { x: 0.12, y: 0.4 };

/**
 * Logotipo «Flamingos» en 3D con encendido de neón (three.js).
 * Muestra el SVG estático hasta que la escena pinta su primer fotograma; si no
 * hay WebGL o algo falla, se queda el SVG.
 */
export function NeonWordmark({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      try {
        const [{ createNeonScene }, svgText] = await Promise.all([
          import("./neon-wordmark-scene"),
          fetch(wordmark.src).then(r => r.text()),
        ]);
        if (disposed) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const scene = createNeonScene(canvas, svgText, { reducedMotion, bleed: CANVAS_BLEED, onFirstFrame: () => setReady(true) });

        const onMove = (e: PointerEvent) => {
          const r = canvas.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
          const y = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
          scene.setPointer(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
        };
        const ro = new ResizeObserver(() => scene.resize());
        const io = new IntersectionObserver(([entry]) => scene.setActive(entry.isIntersecting));
        window.addEventListener("pointermove", onMove, { passive: true });
        ro.observe(canvas);
        io.observe(canvas);

        cleanup = () => {
          window.removeEventListener("pointermove", onMove);
          ro.disconnect();
          io.disconnect();
          scene.dispose();
        };
      } catch {
        // Sin WebGL: se queda el logotipo estático.
      }
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    // -z-10: el halo queda detrás del texto vecino («Somos los», la entradilla).
    <span className={cn("relative -z-10 block", className)}>
      <Image
        src={wordmark}
        alt=""
        priority
        className={cn("block w-full h-auto transition-opacity duration-300", ready && "opacity-0")}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "absolute pointer-events-none transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: `${-CANVAS_BLEED.x * 100}%`,
          right: `${-CANVAS_BLEED.x * 100}%`,
          top: `${-CANVAS_BLEED.y * 100}%`,
          bottom: `${-CANVAS_BLEED.y * 100}%`,
          width: `${(1 + 2 * CANVAS_BLEED.x) * 100}%`,
          height: `${(1 + 2 * CANVAS_BLEED.y) * 100}%`,
        }}
      />
    </span>
  );
}
