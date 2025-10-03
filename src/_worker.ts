// Compose Alteran's runtime helpers so we can extend the worker in this project if needed.
import { createPdsFetchHandler, Sequencer } from '@alteran/astro/worker';

// In Cloudflare adapter "advanced" mode, Astro expects the worker entry to
// export a default factory function: (manifest, args) => exports.
// Return the module exports object with `default` (the Worker object) and any
// named exports (e.g. Durable Objects).
export default function createExports(manifest: unknown, _args?: unknown) {
  const fetch = createPdsFetchHandler({ manifest: manifest as any });
  return {
    default: { fetch },
    Sequencer,
  } as const;
}

export { Sequencer };
