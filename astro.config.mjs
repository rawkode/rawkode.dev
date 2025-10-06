// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import alteran from '@alteran/astro';

export default defineConfig({
  adapter: cloudflare({
    mode: 'advanced',
    workerEntryPoint: {
      path: './src/_worker.ts',
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
