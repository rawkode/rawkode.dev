// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import alteran from '@alteran/astro';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [alteran()],
});
