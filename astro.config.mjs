import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL || 'https://mercado4asuncion.com';

// Salida estática: el sitio es una única página y se publica tal cual
// (Cloudflare Pages / Workers Assets solo sirve ./dist).
export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: site ? [sitemap()] : [],
});
