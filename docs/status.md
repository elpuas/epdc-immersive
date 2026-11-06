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

## Persistent shell — 2026-11-02

Header now contains only the original ElPuas logo and ES/EN/IT language links. Removed section navigation from header; station buttons and return-to-start control remain. Footer shows public cities/telephone links supplied by Alfredo plus localized copyright; email and old external-site footer link removed from immersive frame. Logo uses a restrained CSS glow cycle, disabled for reduced motion. Core phone contacts also present in Astro reading HTML. Intro uses slogan, digital-artisan eyebrow and short localized studio introduction. No new addresses or office claims added.

Footer refinement: copyright, cities and telephone links now share one continuous row. On narrow screens the footer scrolls horizontally instead of shrinking text or wrapping. Camera reserved margins reduced accordingly.

## Entrance sequence

Server-rendered black logo loader replaces the previous visible fallback flash. On the first rendered Three.js frame (or no-WebGL fallback), the same loader logo transitions toward the measured header logo position; heading fades in, localized subtitle types with stable reserved text layout, then invitation/buttons appear. Full subtitle remains available to screen readers. Reduced motion skips sequence; Escape skips it; bounded fallback prevents a loader trap if startup fails. Screenshot-only route bypasses intro animation. Intro copy follows the reviewed headline/directions in chat, localized ES/EN/IT.

## Blog index — 2026-11-02
- Added conventional Astro blog indexes in ES/EN/IT, six posts per page, three pages per locale; shared 54px desktop heading, 19px card titles and 16px body scale, open cards, subtle reveals and lightweight wireframe footer.
- Imported metadata and referenced images from the read-only original MDX: 15 ES / 14 EN / 14 IT. Source hashes recorded in docs/blog-index-inventory.json; article bodies remain in the original project. Card links continue to the original full articles until detail-page migration.
- Header BLOG now opens the local index. Added canonical/alternate metadata, CollectionPage and ItemList schema, sitemap pages and build assertions.
- Build, SEO checks and whitespace checks passed. Browser checked desktop images and page 2 navigation; fixed inherited footer overflow found at 390px. No push or deployment.

## Full blog migration — 2026-11-02 (supersedes index-only status)
- Migrated 43 complete MDX articles unchanged: 15 ES, 14 EN, 14 IT. Original and local hashes, dependencies and routes are verified in docs/blog-migration-inventory.json and scripts/check-blog-migration.mjs.
- Article templates use scoped post.css, existing header/footer shared with the index, a 760px reading column, 54px desktop H1 / 29px body H2 / 16px text, optimized original images, readable code blocks and related articles. Existing home and index appearance preserved.
- Index and related links now open local articles. Fourteen verified translation groups link corresponding articles; the Spanish-only article switches other languages to their indexes. Source MDX was not rewritten.
- Added BlogPosting JSON-LD, article social metadata and 43 sitemap entries. Existing service/contact destinations remain on the legacy site; three lightweight contact redirect routes preserve literal MDX contact links.
- Build, SEO and full migration checks passed. Browser verified index → article, ES → EN equivalent, 390px article width without overflow, independently scrolling code. No push, deployment or indexing activation.
