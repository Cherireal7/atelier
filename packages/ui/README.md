# @atelier/ui

Shared UI primitives for Etege. Currently: `Button`, `Input`, `Card`. Source-first — the package ships raw TSX; each consuming app transpiles it as part of its own build (Next.js `transpilePackages`, Vite via workspace resolution).

## Why source-first?

**Pro:** no build step, no build cache, no stale artifacts. Edit `Button.tsx`, next reload every app sees it.
**Con:** every consumer must have React + a JSX transpiler configured. Fine in a monorepo — never for a public npm package.

This is the modern monorepo pattern (Turborepo docs, Vercel templates, shadcn). Different from a public library like `@radix-ui/react-slot` which pre-builds so anyone can `npm install` it standalone.

## Install

Inside any consuming app:

```jsonc
// apps/shell/package.json
{
  "dependencies": {
    "@atelier/ui": "workspace:*",
    "@atelier/tokens": "workspace:*"
  }
}
```

And for Next.js apps only:

```js
// next.config.mjs
export default {
  transpilePackages: ['@atelier/ui', '@atelier/tokens'],
};
```

## Use

```tsx
import { Button, Input, Card, CardHeader, CardTitle, CardBody, CardFooter } from '@atelier/ui';

<Button variant="primary" size="lg">Reserve fitting</Button>
<Button variant="ghost" asChild><a href="/collection">Browse</a></Button>

<Input label="Email" hint="For fitting reminders." required />
<Input label="Postcode" error="We don't ship there yet." />

<Card as="article" elevated>
  <CardHeader>
    <CardTitle>Netela</CardTitle>
    <CardDescription>Silk with fine tibeb</CardDescription>
  </CardHeader>
  <CardBody>Made to measure in the Addis atelier.</CardBody>
  <CardFooter><span>$1,800</span></CardFooter>
</Card>
```

## Patterns worth studying

**CVA variants** — Button uses `class-variance-authority` to derive class strings from `variant` and `size` props. Adding a new variant is one entry in the config; there is no runtime `switch`.

**`asChild` / Radix Slot** — instead of a `Button` component that renders `<a>`, `<Link>`, or `<button>` depending on a prop, `asChild` clones the caller's child and merges the button's classes + a11y props onto it. Cleaner than `renderAs` or `is` props.

**`cn()` helper** — `clsx` for conditional class strings, then `tailwind-merge` to deduplicate conflicts (`cn('px-2', 'px-4')` → `'px-4'`). Standard shadcn pattern.

**Accessible Input by default** — `label` is required, `htmlFor` is auto-generated via React's `useId`, hints and errors are wired via `aria-describedby`, errors set `role="alert"` and `aria-invalid`. You have to opt *out* of accessibility, not in.

## Test

```sh
pnpm --filter @atelier/ui test
# or from repo root:
pnpm test
```

Vitest + jsdom + @testing-library/react. Every component gets: renders correctly, honors props, keyboard/click interaction works, a11y attributes present.

## Adding a component

1. `src/<name>/<Name>.tsx` — component (forwardRef, CVA variants if needed)
2. `src/<name>/<Name>.test.tsx` — render + interaction + a11y tests
3. `src/<name>/index.ts` — barrel export
4. Add to `src/index.ts` barrel
5. Add a subpath export to `package.json` if you want `import { X } from '@atelier/ui/name'`

No version bump needed — `workspace:*` means the next reload picks it up.
