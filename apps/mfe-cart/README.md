# @atelier/mfe-cart

Cart micro frontend — a **pure client-side SPA** on Vite + React. Deliberately a different stack from the shell/catalog Next.js apps: real micro frontend deployments almost always mix stacks (SSR-heavy pages on Next, interactive SPAs on Vite, admin dashboards on plain CRA, etc). The consistency comes from the shared `@atelier/ui` / `@atelier/tokens`, not from the framework.

## Runs two ways

**Standalone:** `pnpm --filter @atelier/mfe-cart dev` → `http://localhost:4402/cart/`.

**Composed with the shell:** shell rewrites `/cart` and `/cart/:path*` to `http://localhost:4402/cart/...`. So `http://localhost:4400/cart` renders this MFE inside the shell chrome.

## Why CSR here

Cart is the least LCP-critical page — the customer already committed to the site by adding an item. Interactivity (quantity controls, remove, subtotal) is what matters, and interactivity is a client-side story anyway. Doing SSR for a cart is over-engineering: the server would render a snapshot of localStorage state that only the client can actually read. Just ship the shell + JS and let the client render.

**Proof this is CSR** — `curl -s http://localhost:4400/cart | head -30` shows an almost-empty HTML doc: a `<div id="root">` and a `<script>` tag. No product names, no prices, no cart items. All of that is populated by JavaScript after the bundle boots.

Compare `curl -s http://localhost:4400/collection` — you'll see product names right in the HTML. That's SSR vs CSR in one contrast.

## Vite basePath: '/cart/'

Every asset URL Vite emits gets prefixed with `/cart/`, so when the shell proxy fetches from Vite the paths line up. Without this, `<script src="/src/main.tsx">` would try to load from the shell origin (`localhost:4400`) and 404.

## HMR through the proxy

Vite's hot-module-reload uses a websocket. The shell's Next rewrite is HTTP-only — it doesn't proxy websockets. So `vite.config.ts` pins the HMR websocket to `ws://localhost:4402` directly, bypassing the shell. Whether you browse via `:4400/cart` or `:4402/cart/`, HMR just works.

## Cart state

`src/store/cart.ts` — Zustand + `persist` middleware writes to `localStorage` under `etege-cart`. Because the shell proxy makes both `/collection` and `/cart` look like the same origin (`localhost:4400`), the catalog can write to this same store without any network hop. That's a happy accident of the composition pattern; in production, cross-MFE state usually lives on the server (a real `cart-svc`).
