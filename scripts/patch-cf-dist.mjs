#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const adapterPath = join('dist', '_worker.js', '_@astrojs-ssr-adapter.mjs');

if (!existsSync(adapterPath)) {
  console.error(`[patch-cf-dist] Missing ${adapterPath}. Has the Astro build run?`);
  process.exit(1);
}

let content = readFileSync(adapterPath, 'utf8');

// If createExports is already exported, do nothing
if (/export\s+\{\s*createExports\s*\}/.test(content)) {
  console.log('[patch-cf-dist] createExports already exported. Skipping.');
  process.exit(0);
}

// Append a re-export of createExports from the Cloudflare server entrypoint
content += "\nexport { createExports } from '@astrojs/cloudflare/entrypoints/server.js';\n";
writeFileSync(adapterPath, content, 'utf8');
console.log('[patch-cf-dist] Added createExports export to _@astrojs-ssr-adapter.mjs');

