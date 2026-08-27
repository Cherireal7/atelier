# @atelier/tokens

Design tokens for the Etege sandbox — colors, typography, radii, shadows, motion. Consumed by every app in the workspace so a single palette change updates the whole system.

## The pattern

Two files, same values:

| File | For | How to use |
|---|---|---|
| `src/theme.css` | Tailwind v4 apps (default) | `@import "@atelier/tokens";` |
| `src/tokens.css` | Non-Tailwind consumers (email, widgets) | `@import "@atelier/tokens/tokens.css";` |

`theme.css` uses Tailwind v4's `@theme` block, which does two things at once:

1. **Declares CSS custom properties** at `:root` — so `var(--color-wine)` works anywhere.
2. **Generates Tailwind utility classes** — `bg-wine`, `text-ivory`, `font-display`, `rounded-md`, `shadow-lift`.

That's the whole appeal of v4: one declaration, two consumers. In v3 you had to write the tokens once in `tailwind.config.js` and again as CSS variables — always drifted.

## Usage inside an app

```css
/* app/globals.css or src/index.css */
@import "tailwindcss";
@import "@atelier/tokens";
```

```tsx
<button className="bg-wine text-ivory rounded-md px-6 py-3 hover:bg-wine-deep">
  Reserve fitting
</button>

<h1 className="font-display text-display text-ink">Etege</h1>
```

## Adding a token

1. Edit `src/theme.css` — add the value inside `@theme { ... }`.
2. Mirror it in `src/tokens.css` (raw `:root` declaration).
3. Consumers automatically pick it up on next rebuild — no `package.json` bump needed inside the workspace.

## Token catalog

**Palette** — ivory, cream, ink, muted, gold, gold-soft, wine, wine-deep, sage, sage-soft

**Semantic** — canvas, surface, primary, primary-hover, on-primary, accent, text, text-muted

**Type** — `font-display` (Fraunces), `font-body` (Inter), `font-mono`  
**Scale** — caption (12) · body (16) · lead (18) · title (24) · headline (36) · display (clamp 44–72)

**Radii** — none · sm · md · lg · pill  
**Shadows** — subtle · lift · hover  
**Motion** — duration-fast/base/slow, ease-out, ease-in-out

## Why keep this in its own package

Any app in `apps/*` can rebrand by swapping one dep. If Etege becomes Amora tomorrow (Section 27.7 of the research), we change ten lines here and every micro frontend inherits the new palette — no per-app find-and-replace.
