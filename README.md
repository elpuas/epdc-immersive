# ElPuas Digital Crafts — Immersive

Local foundation for an Astro + React + Three.js agency experience. Git remote: https://github.com/elpuas/epdc-immersive.git. No deployment is configured. Alfredo owns the push.

## Start

Requires Node >=22.23.4. With nvm, run `nvm install` then `nvm use` in this folder before installing. This does not require changing the system-wide Node installation.

```sh
npm install
npm run dev
```

`npm run build` generates `dist/`; `npm run preview` serves that build.

## Start reading

- AGENTS.md — implementation boundaries
- docs/creative-brief.md — current direction
- docs/storyboard.md — scene flow and visual references
- docs/content-plan.md — preserving existing MDX and routes
- docs/status.md — implemented vs pending

The starter demonstrates only a geometric environment and prepared camera destinations. It does not include AI, real team assets, imported MDX, functional contact, or the finished storyboard panels.

## Languages and search foundation

Open /es/, /en/ or /it/. Root redirects to Spanish. A reading version beneath the 3D experience contains actual server-generated HTML. Copy .env.example to .env only when configuring a destination; previews remain noindex by default. Run npm run check:seo after a build. See docs/seo-i18n.md for pending production work and docs/content-inventory.json for preserved source MDX hashes.
