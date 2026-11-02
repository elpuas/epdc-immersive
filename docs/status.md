# Foundation status

Created 2026-10-30. Folder/package: epdc-immersive. Brand: ElPuas Digital Crafts.

Implemented: Astro shell, React/Three.js island, deterministic simple faceted terrain, grid, authored camera destinations, HTML navigation, reduced-motion handling, and static fallback content.

Pending: actual screenshot/portrait panels, full camera choreography, prompt interpretation, content inventory/migration, forms, AI endpoint, mobile visual QA, Spacefast preparation and publication.

GitHub push is owned by Alfredo. Origin configured: https://github.com/elpuas/epdc-immersive.git. No deployment performed. See README for local commands.

## Verification

Astro 7 foundation builds successfully using Node 22 through a temporary npm-provided runtime. The system Node 22.19.0 is older than the required >=22.23.4. npm audit reported zero vulnerabilities after updating Astro and integrations. A large client-bundle warning remains; split and measure the 3D code before production. No browser visual QA has been performed for this starter. No initial commit or push has been made.

## Terrain iteration — 2026-10-30

Replaced starter terrain with a deterministic low-poly valley, cyan wireframe edges, subtle GPU edge displacement, sparse slow edge highlights, an authored lime route with a traveling pulse, and 55 low-opacity background points with slow brightness variation. Motion is disabled with prefers-reduced-motion. Geometries/materials are stable and disposed on unmount. Removed empty placeholder panels to focus on terrain. Build passed; desktop scene inspected in browser. Mobile/performance profiling remain pending. No external image textures, postprocessing or heavy reflections added.

Route direction: begins aligned with a grid axis, then breaks away into authored curves and slightly rises above the ground, expressing outside-the-box thinking. Desktop and 390px mobile composition inspected; mobile terrain framing and performance still need refinement.

Pointer parallax: damped camera offset (max 0.5 units horizontal / 0.22 vertical), fine mouse pointers only, reset on pointer exit/window blur, disabled for reduced motion. Text remains screen-space HTML.

Mountain accents: sparse slow lime/cyan highlights restricted to raised terrain edges, with independent phases and soft brightness. Reduced-motion mode keeps the base terrain static without animated highlights.

Services scene: added explicit Servicios destination, authored response, four HTML service panels with staggered entry and a camera shift in the continuous terrain. Home choices lead to services; return control restores arrival. Panel actions currently lead to the existing work placeholder, not completed case studies. Build passed and transition inspected in browser. Spatial alignment of HTML panels with the 3D planes and full desktop/mobile QA remain pending.

## Complete first-pass journey

Added work, studio/team, contact and blog destinations in the same persistent environment. Real project thumbnails and three team photos copied from the read-only epdc reference, plus blog cover images. Work offers project selection and links to existing cases; blog links to existing articles. Metadata is excerpted from existing content; no MDX body or original source file changed. Contact validates locally and explicitly submits nowhere. Full MDX import and preserved local reading routes remain pending. Camera and panel alignment are first pass, not finished art direction.

## Spatial navigation refinement

Sections now stay mounted at fixed world coordinates via Drei Html transform. Camera position and look target interpolate toward authored anchors; content does not remount per destination. Services use individual world-space panels; work/team/contact/blog retain readable HTML inside persistent spatial surfaces. Inactive surfaces remain visible but dimmed and inert. Compact aspect ratios arrange services into two rows and adjust viewing distance. Navigation/fallback remain HTML. Browser inspection confirmed persistent distant panels and service arrival; full spatial art direction, transition focus handling and mobile/performance QA still need refinement.

## Reverted individual-service navigation

At Alfredo’s request, restored the previous service group, camera anchors and compact layout. Removed individual service focus, navigation arrows, angled service placement and plinths. Terrain, microanimations and persistent world-space section navigation remain. Future spatial adjustments concern entire sections, not individual service items.

## Stations from Alfredo’s hand-drawn map

Whole sections (not individual services) are now fixed stations on alternating sides of a central aisle, each rotated inward with a base and sign. Services stay together on one section surface. Camera travels through aisle waypoints then turns to face the destination with aspect-aware reading distance; all stations remain mounted. No individual service arrows/focus. Motion reduced snaps to destination. Content panels have bounded internal scroll for lengthy sections. Build and browser checks tracked in chat.

Depth pass: station spacing increased to 40 world units along alternating sides. Inactive stations receive soft blur and lower contrast; arrival uses especially low visibility to protect introductory copy. Selected station restores clarity. Terrain length extended to cover destinations. Blur is a presentation approximation, not physical depth-of-field.

Station reading scale: arrival camera distance now fits the 10 × 6.5 world-unit surface into 90% of viewport width and the available height after reserving navigation/prompt margins. Distant station geometry and intro scale unchanged.

## Multilingual SEO foundation — 2026-10-30

Implemented /es/, /en/, /it/ and root redirect; translated interactive UI and metadata; same-language editorial metadata/links sourced from original MDX; reciprocal hreflang, canonical, OG/Twitter summary and factual JSON-LD graph; Astro-rendered user-accessible reading disclosure; sitemap.xml, robots.txt, optional llms.txt. Preview uses noindex/disallow by default. Added env example and SEO/i18n guidance.

Verified: build passed; check:seo passed for all languages (HTML language, metadata, JSON-LD parsing, localized reading content, alternates, sitemap). All 73 original MDX hashes unchanged. Editorial images referenced locally exist. English interactive UI and switching to Italian inspected in browser. New UI translations remain drafts for Alfredo’s review. No complete MDX migration, social image, deployed validation or indexation activation yet. Existing large-bundle warning remains.
