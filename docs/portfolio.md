# Portfolio content and rotation

The 30 localized MDX case studies live in `src/content/portfolio/`. Their bodies and existing URLs came from the legacy site. The migration record is `docs/portfolio-migration-inventory.json`.

The immersive work station shows one primary case and three secondary cases per language. To change the selection, edit these frontmatter fields in each of the Spanish, English and Italian versions of the relevant cases:

```yaml
showcaseRole: "primary" # primary, secondary or none
showcaseOrder: 1      # unique display order within that language
```

Keep exactly one `primary` and three `secondary` cases per locale, with unique orders. `npm run dev` and `npm run build` regenerate `src/lib/portfolio-projects.json` from the local frontmatter and fail if the selection is inconsistent. Restart the dev server after changing the flags. All 30 case routes remain published in the static build regardless of their showcase role.

`npm run check:portfolio` verifies the migrated bodies, assets, routes, language links and shared footer after building. The initial import script, `scripts/migrate-portfolio.mjs`, is only for pulling content again from the legacy checkout; routine selection changes require no legacy access.
