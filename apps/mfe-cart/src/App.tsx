import { useEffect, useMemo, useState } from 'react';
import { Button, Nav } from '@atelier/ui';
import { CartLine } from './components/CartLine';
import { SAMPLE_ITEMS, formatPrice, useCartStore } from './store/cart';

export function App() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const clear = useCartStore((s) => s.clear);

  // Client-side timestamp — proof this rendered in the browser, not on the
  // server. Compare to /collection which bakes its timestamp into HTML.
  const [renderedAt] = useState(() => new Date().toISOString());
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );
  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  return (
    <div className="min-h-screen bg-ivory text-ink antialiased">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-caption uppercase tracking-widest text-muted">
              Your cart
            </p>
            <h1 className="mt-2 font-display text-headline text-ink">
              {totalItems === 0
                ? 'Nothing yet.'
                : `${totalItems} ${totalItems === 1 ? 'piece' : 'pieces'} held.`}
            </h1>
          </div>
          <span className="rounded-pill bg-gold px-3 py-1 font-mono text-caption font-semibold uppercase tracking-widest text-ink">
            CSR
          </span>
        </div>

        <p className="mt-6 inline-block rounded-pill bg-cream px-3 py-1 font-mono text-caption text-muted">
          CSR · JS booted at {renderedAt}
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-lg border border-gold/40 bg-cream/40 p-10 text-center">
            <p className="font-display text-title text-ink">
              Your cart is empty.
            </p>
            <p className="mt-2 max-w-md mx-auto text-body text-muted">
              Browse the collection to add pieces, or drop in the sample items
              below to see the cart in action.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href="/collection">Browse the collection</a>
              </Button>
              <Button
                variant="secondary"
                onClick={() => SAMPLE_ITEMS.forEach(addItem)}
              >
                Add sample items
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="mt-10">
              {items.map((item) => (
                <CartLine key={item.slug} item={item} />
              ))}
            </ul>

            <div className="mt-8 flex items-center justify-between border-t border-gold/40 pt-6">
              <div>
                <p className="text-caption uppercase tracking-widest text-muted">
                  Subtotal
                </p>
                <p className="mt-1 font-display text-headline text-ink">
                  {formatPrice(subtotal)}
                </p>
                <p className="mt-1 text-caption text-muted">
                  Made-to-measure — final fitting confirms delivery date.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Button size="lg" asChild>
                  <a href="/checkout">Continue to checkout</a>
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="text-caption text-muted hover:text-wine"
                >
                  Empty cart
                </button>
              </div>
            </div>
          </>
        )}

        <p className="mt-16 text-caption text-muted">
          {hydrated
            ? 'Zustand store rehydrated from localStorage.'
            : 'Hydrating from localStorage…'}
        </p>
      </main>
    </div>
  );
}
