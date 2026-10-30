# Mercado 4, Asunción

Independent nonprofit tourism and public-education guide in Spanish. Sources, dated Maps reference and uncertain operating details appear on the page. No operator or municipal affiliation and no merchant directory or booking service.

## Preserved architecture and dependencies

Astro 5.7 static output remains; the installed Cloudflare adapter is not activated. Weather continues to refresh in the browser from Open-Meteo (CC BY 4.0), with no stale build-time forecast presented as current. Native ASSETS Worker handles canonical HTTP/www redirects and genuine noindex 404. Existing project mercado4asuncion and compatibility date retained; no new external bindings/domains.

Preserve package.json, both lockfiles and .node-version. The official historical build used Node 22.23.3, pnpm 10.11.1 and frozen Wrangler 4.132.0. Use pnpm install --frozen-lockfile, pnpm run check, pnpm run build and pnpm exec wrangler deploy --dry-run for local preparation. A dry-run is not deployment.

Image provenance is documented in PHOTO-LINKS.md. Private performance exports and run-specific evidence remain outside this public repository. Actual Cloudflare build, browser and production acceptance remain separate gates.
