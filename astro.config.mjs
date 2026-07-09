// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// TODO: trocar pela URL definitiva quando o domínio for decidido
const SITE_URL = 'https://gechat.com.br';

export default defineConfig({
  site: SITE_URL,
  integrations: [icon(), sitemap()],
});
