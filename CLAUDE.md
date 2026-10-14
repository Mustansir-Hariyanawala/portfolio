# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server with HMR
- `npm run build`: production build to `dist/`
- `npm run preview`: serve the built `dist/`
- `npm run lint`: ESLint (flat config: `@eslint/js` recommended, `react-hooks`, `react-refresh`)

There is no test suite and no TypeScript. The source is plain JS/JSX.

## Architecture

A personal portfolio SPA built with React 19, Vite 8, React Router 7 (`BrowserRouter`) and Tailwind CSS v4 (through the `@tailwindcss/vite` plugin, so there is no tailwind config file).

- `src/App.jsx` defines all routes: `/`, `/about`, `/experience`, `/projects`, `/projects/:projectId`, `/contact`. `NeuralBackground` and `Navbar` render outside `<Routes>` so they persist across navigation.
- `src/pages/<Page>/` and `src/components/<Component>/` each hold a `.jsx` file and usually a sibling `.css` file that the component imports directly. Most styling is plain CSS with BEM-ish class prefixes per page (`projects-*`, `project-details-*`). Tailwind utility classes appear mainly in the vendored effect components.
- `src/data/projects.js` is the single source of project content. `Projects` filters it client-side (by title, shortDescription and technologies, through `SearchBar`). `ProjectDetails` looks up a project by `id` from the route param, so a project's `id` is also its URL slug. Image paths in the data point under `public/images/projects/<id>/`. Those folders don't exist yet, and the `github`/`liveDemo` URLs are placeholders.
- Visual effect components:
  - `NeuralBackground`: a fixed full-viewport 2D canvas, a dependency-free React port of particles.js (MIT, Vincent Garreau) using its demo config: linked particles, repulse on hover, push on click. Tuning constants sit at the top of the file. Pointer events are read from `window` because the canvas has `pointer-events-none`.
  - `SpecularButton`: a WebGL (`ogl`) shader button used as the main CTA across pages.
  - `NavBar/PillNav`: a GSAP-animated nav with its own mobile menu. `Navbar` passes it `navItems` and the active path.
  - `NavBar/GooeyBrand`: currently unused.
- Global styles live in `src/index.css`: Sora for headings and Inter for body (Google Fonts), a black body background and light text. `src/App.css` is not imported.

## Gotchas

- `App.jsx` imports `./components/Navbar/Navbar`, but the directory is `components/NavBar/`. This resolves on Windows' case-insensitive filesystem and will break builds on Linux/CI. Fix the path casing if you touch it.
- The contact forms (`pages/Contact`, `components/Connect`) only `console.log` their data and have no backend. Name, email and similar personal details are still placeholders ("Your Name", `your@email.com`).
- `src.zip` at the root is a stray backup archive, not part of the build.
