# BSV FLAMINGO'S STATS • Miami Vice Edition

Aplicación web para visualizar estadísticas del equipo de baloncesto BSV Flamingo's, desarrollada con Next.js, React, Tailwind CSS y shadcn/ui.

## Características

- 🦩 **Diseño Miami Vice** - Estética retro neón inspirada en los años 80
- 📊 **Estadísticas Completas** - Seguimiento detallado de jugadores y partidos
- 📱 **Responsive** - Optimizado para todos los dispositivos
- ⚡ **Rendimiento** - Construido con Next.js para máxima velocidad
- 🎨 **Componentes UI** - Interfaz moderna con shadcn/ui

## Tecnologías

- [Next.js 16](https://nextjs.org/) - Framework React
- [React 19](https://react.dev/) - Librería UI
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Lucide React](https://lucide.dev/) - Iconos

## Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
bsv-flamingos/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── header.tsx          # Header del sitio
│   ├── tabs-nav.tsx        # Navegación por tabs
│   ├── general-tab.tsx     # Tab de estadísticas generales
│   ├── matches-tab.tsx     # Tab de partidos
│   ├── team-tab.tsx        # Tab del equipo
│   ├── roster-tab.tsx      # Tab de plantilla
│   ├── player-profile.tsx  # Perfil de jugador
│   ├── stat-card.tsx       # Tarjeta de estadística
│   └── position-badge.tsx  # Badge de posición
├── lib/
│   ├── data.ts             # Datos de jugadores y partidos
│   ├── types.ts            # Tipos TypeScript
│   ├── stats.ts            # Cálculos de estadísticas
│   └── utils.ts            # Utilidades
└── temp-backup/
    └── basketball-stats-site.html  # HTML original
```

## Añadir Datos

Para añadir nuevos partidos y estadísticas, edita el archivo [lib/data.ts](lib/data.ts):

```typescript
export const matches: Match[] = [
  {
    id: 5,
    date: "2025-02-09",
    opponent: "Nuevo Rival",
    home: true,
    ourScore: 70,
    oppScore: 65,
    stats: [
      { playerId: 4, minutes: "25:00", points: 15, t2Made: 5, t3Made: 1, ftMade: 2, ftAttempted: 3, fouls: 2, plusMinus: 10 },
      // ... más estadísticas
    ]
  }
];
```

## Personalización

### Colores

Los colores del tema Miami Vice se pueden modificar en [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  'vice-black': '#0B0B0B',
  'vice-dark': '#1a1a2e',
  'vice-pink': '#FF006E',
  'vice-blue': '#00F5FF',
  'vice-purple': '#B026FF',
  'vice-yellow': '#FFD23F',
}
```

### Fuentes

Las fuentes utilizadas son:
- **Bebas Neue** - Para títulos y números
- **Rajdhani** - Para texto general

## Licencia

ISC
