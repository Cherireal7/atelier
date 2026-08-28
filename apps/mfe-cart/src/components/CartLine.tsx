import { Button } from '@atelier/ui';
import { type CartItem, formatPrice, useCartStore } from '../store/cart';

export function CartLine({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex items-start gap-6 border-b border-ink/10 py-6 last:border-b-0">
      <div
        className="h-20 w-16 shrink-0 rounded-md"
        style={{
          background: `linear-gradient(140deg, ${item.swatch.from}, ${item.swatch.to})`,
        }}
        aria-hidden="true"
      />
      <div className="flex-1">
        <p className="font-display text-title text-ink">{item.name}</p>
        <p className="mt-1 text-caption text-muted">
          {formatPrice(item.price)} each
        </p>
        <div className="mt-3 inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
            aria-label={`Decrease ${item.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-ink/15 text-ink hover:bg-cream"
          >
            −
          </button>
          <span className="min-w-[2rem] text-center font-mono text-body tabular-nums">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
            aria-label={`Increase ${item.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-ink/15 text-ink hover:bg-cream"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-title text-ink">
          {formatPrice(item.price * item.quantity)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.slug)}
          className="mt-2 text-caption text-muted hover:text-wine"
        >
          Remove
        </Button>
      </div>
    </li>
  );
}
