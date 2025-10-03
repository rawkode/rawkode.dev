// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import alteran from '@alteran/astro';

export default defineConfig({
  adapter: cloudflare({
    mode: 'advanced',
    workerEntryPoint: {
      // Use the adapter's default server entrypoint to provide `createExports`
      // while also exposing our Durable Object named export(s).
      path: '@astrojs/cloudflare/entrypoints/server.js',
      namedExports: ['Sequencer'],
    },
  }),
  integrations: [
    alteran({
      includeRootEndpoint: true,
      debugRoutes: process.env.NODE_ENV !== 'production',
    }),
  ],
});
