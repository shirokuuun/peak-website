import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import publication from './src/data/publication.json' with { type: 'json' };

const site = process.env.PEAK_SITE_URL || publication.websiteUrl || undefined;

export default defineConfig({
  output: 'static',
  site,
  integrations: [react(), ...(site ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
});
