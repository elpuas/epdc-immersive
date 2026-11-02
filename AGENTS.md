# ElPuas immersive website

## Scope and ownership
Work with Alfredo on a new immersive agency website. This is a separate prototype, not the production site. Do not push, deploy, create remote repositories, change DNS, or submit communications unless Alfredo requests it. Alfredo will push this base to GitHub.

## Current direction
Read docs/creative-brief.md and docs/storyboard.md before implementation. Use a continuous dark low-poly environment and large editorial content panels. Prompts select authored destinations and camera transitions. The lime/cyan reference is the preferred current visual exploration; alternative monochrome terrain is not a final decision. Do not revive the watercolor, ribbon, or four-path concepts without instruction.

## Content preservation
Existing reference project: /Users/alfredonavas/REACT/epdc (read-only for this task). Blog and portfolio MDX bodies, frontmatter, translations, assets and public URLs must be preserved. Inventory and verify dependencies before importing. Never invent case-study results, team biographies, screenshots or testimonials. Home/service copy may be revised with Alfredo. Do not copy .env files, credentials, node_modules, dist or Git metadata from another project.

## Architecture
Astro owns pages and content. One React island owns experience state and Three.js via React Three Fiber. HTML owns readable text, links and forms. Keep one Canvas, deterministic geometry, bounded effects and capped pixel ratio. Do not recreate geometry each frame. No AI API or credentials in the browser; start with explicit authored choices. Preserve direct navigation and a non-WebGL fallback. Respect reduced motion and keyboard navigation.

## Verification
Run npm run build after meaningful implementation. Inspect desktop/mobile and chosen transitions before claiming visual completion. Use browser tools when available. Build success is not a visual or accessibility pass. Document limitations. No mirror-image unit tests for styling-only changes.

## Skills
Use available relevant skills rather than installing speculative ones. Spacefast publication requires its publishing and verification workflows when requested. No custom skill is required for this base; project-specific rules belong here and in docs.

## SEO and languages — required foundation
All new interface and home/service copy must support es/en/it through src/lib/i18n.ts. Do not hardcode new Spanish UI outside the shared dictionary. Use original localized MDX metadata/bodies for editorial content, never replace their translations with generated ones. Preserve established article/case URLs and inspect translationKey/route generation before migration.

Language homes are /es/, /en/, /it/ with localized metadata and reciprocal hreflang. Keep readable user-accessible Astro HTML independent of WebGL. Update JSON-LD only with factual content present on the page. Add sitemap entries only for built routes; do not invent translations or dates. Preview indexing is disabled by default. Only enable INDEXABLE with explicit production SITE_URL after deployment/content readiness approval. llms.txt is optional navigation, not a substitute for content or guaranteed AI discovery.

After SEO/i18n changes run npm run build and npm run check:seo. Review src/lib/editorial.ts and docs/content-inventory.json when importing content. See docs/seo-i18n.md for production blockers.
