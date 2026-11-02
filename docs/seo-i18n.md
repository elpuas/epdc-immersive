# SEO, structured data and multilingual foundation

Supported locales: es, en, it. Routes: /es/, /en/, /it/. Root redirects to Spanish. The current prototype does not yet migrate the old article/case-study routes; these still link to the existing website.

## Content delivery

Every locale has real Astro-rendered HTML in a user-accessible reading disclosure below the experience. This is not a hidden crawler-only block. It remains usable without JavaScript or WebGL. Core services, people and selected editorial metadata are shared with the experience. The immersive UI and its navigation are translated; interface translations are draft and need editorial review. No MDX article or case-study body has been machine-translated or modified.

## Metadata and entities

Localized title/description, lang, canonical, reciprocal hreflang with x-default, Open Graph, Twitter summary, JSON-LD Organization/WebSite/WebPage/Service. No invented ratings, office addresses, prices, FAQs, search action or unsupported rich-result claims. Add actual social preview image after branding is approved.

## Deployment policy

INDEXABLE defaults false: noindex meta and robots disallow on previews. This is intentional for unfinished prototypes. Production requires an explicit HTTPS SITE_URL origin and INDEXABLE=true. Do not activate these until URLs, content migration and deployment destination are approved. robots.txt is not authentication. Canonicals currently target the existing production origin as the intended replacement; change SITE_URL if the final destination differs.

Sitemap includes only built language homes, not missing article/service routes. It will need expansion during migration. No fabricated lastmod timestamps. llms.txt is an optional link index, not an established ranking mechanism or a guarantee of visibility. The substantive foundation is accessible original content and clear structure.

## Preserving existing content

content-inventory.json records source paths, languages, titles, explicit slugs and SHA-256 hashes of blog/portfolio MDX. Source checkout was only read. Actual migrated public URLs must be verified against the source route builders and current public site; missing translations must not receive invented hreflang links. Localized editorial excerpts come from original MDX frontmatter in src/lib/editorial.ts.

## Before production

- Migrate existing MDX and assets with unchanged content/URLs; compare inventory hashes.
- Verify per-document translation relationships; do not infer equivalence from filenames alone.
- Add Article/BreadcrumbList only on actual article/case reading pages, with factual authors/dates/images.
- Check status codes, redirects, canonical consistency, sitemap URL accessibility and localized internal links.
- Review translations with Alfredo; check keyboard, headings, layout and reading disclosure.
- Validate deployed JSON-LD with Google tools and monitor Search Console after publication.
- Profile bundle size, image dimensions and Core Web Vitals. Current 3D bundle warning remains.

No production deployment or Search Console submission is part of this task.
