# @atelier/mfe-catalog

Catalog micro frontend. A standalone Next.js 15 SSR app that serves the `/collection` route family.

## Runs two ways

**Standalone (during development):** `pnpm --filter @atelier/mfe-catalog dev` → `http://localhost:4401/collection`.

**Composed with the shell (production and dev):** the shell rewrites `/collection/:path*` to `http://localhost:4401/collection/:path*`, so `http://localhost:4400/collection` shows this MFE with the shell's chrome (which is the shared `Nav` from `@atelier/ui`, so it looks the same either way).

In production, Nginx replaces the shell's dev-rewrite with a real `proxy_pass` to the container running this MFE. Same URL, same routing shape, one different config file. That's Step 11.

## Why SSR here

The catalog is the LCP-critical page — customers arriving from search or social ads need the hero product visible on the first paint. SSR ships pre-rendered HTML so the largest element (the product tile) paints without waiting for React to hydrate.

`export const dynamic = 'force-dynamic'` forces server-render per request (Next 15 App Router defaults to static generation). The `renderedAt` timestamp on the page proves the render happened on the server on this exact request.

## basePath = '/collection'

Every route in this app lives under `/collection`:

- `localhost:4401/collection` — grid
- `localhost:4401/collection/etege-signature-bridal-gown` — detail

Same paths work through the shell rewrite:

- `localhost:4400/collection` — grid (proxied)
- `localhost:4400/collection/etege-signature-bridal-gown` — detail (proxied)

Assets, internal links, and (later) API routes all get the prefix automatically. No manual URL munging.

## Data

Currently reads from `src/lib/products.ts` — 8 products modeled from the Mesafint research (bridal, ceremonial, ready-to-wear, accessories) with realistic prices ($260–$2,800) and 2–10 week delivery windows.

In Step 9 this becomes a GraphQL fetch against the BFF, which in turn aggregates the `product-svc` microservice.

## Verify SSR

```sh
curl -s http://localhost:4401/collection | grep 'SSR · rendered'
# → SSR · rendered 2026-08-28T...
```

The timestamp is in the HTML, not injected by JS. Do it twice — timestamps change. That's server-render per request.
