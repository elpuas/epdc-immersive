# SEO, structured data and multilingual foundation

Supported locales: es, en, it. Routes: /es/, /en/, /it/. Root redirects to Spanish. All 43 existing blog articles are migrated at their original language/slug paths. Case studies remain linked to the existing website.

## Content delivery

The immersive homes retain a noscript reading fallback; no visible reading disclosure is appended to the experience. Blog indexes and complete article bodies are Astro-rendered HTML, readable without JavaScript or WebGL. Core services, people and selected editorial metadata are shared with the experience. The immersive UI and its navigation are translated; interface translations are draft and need editorial review. No MDX article or case-study body has been machine-translated or modified.

## Metadata and entities

Localized title/description, lang, canonical, reciprocal hreflang with x-default, Open Graph, Twitter summary, JSON-LD Organization/WebSite/WebPage/Service. No invented ratings, office addresses, prices, FAQs, search action or unsupported rich-result claims. Add actual social preview image after branding is approved.

## Deployment policy

INDEXABLE defaults false: noindex meta and robots disallow on previews. This is intentional for unfinished prototypes. Production requires an explicit HTTPS SITE_URL origin and INDEXABLE=true. Do not activate these until URLs, content migration and deployment destination are approved. robots.txt is not authentication. Canonicals currently target the existing production origin as the intended replacement; change SITE_URL if the final destination differs.

Sitemap includes language homes, all nine paginated blog indexes and all 43 complete articles. It excludes unmigrated service/case routes and the temporary legacy contact redirects. No fabricated lastmod timestamps. llms.txt is an optional link index, not an established ranking mechanism or a guarantee of visibility. The substantive foundation is accessible original content and clear structure.

## Preserving existing content

content-inventory.json records source paths, languages, titles, explicit slugs and SHA-256 hashes of blog/portfolio MDX. Source checkout was only read. Actual migrated public URLs must be verified against the source route builders and current public site; missing translations must not receive invented hreflang links. Localized editorial excerpts come from original MDX frontmatter in src/lib/editorial.ts.

## Before production

- Blog migration complete: scripts/check-blog-migration.mjs verifies all 43 original/local MDX hashes, assets and built article routes. Portfolio migration remains pending.
- Fourteen reviewed translation groups are recorded in src/lib/blog-translations.json, complementing explicit source translationKey values. A Spanish-only post stays unpaired. No equivalents are invented.
- BlogPosting schema now uses factual article authors, dates and images; no generated publication dates or authors.
- Check status codes, redirects, canonical consistency, sitemap URL accessibility and localized internal links.
- Review translations with Alfredo; check keyboard, headings, layout and reading disclosure.
- Validate deployed JSON-LD with Google tools and monitor Search Console after publication.
- Profile bundle size, image dimensions and Core Web Vitals. Current 3D bundle warning remains.

No production deployment or Search Console submission is part of this task.
