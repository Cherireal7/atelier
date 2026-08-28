import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  swatch: { from: string; to: string };
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
}

/**
 * Cart state, persisted to localStorage under `etege-cart`.
 * Because the shell proxy makes /collection AND /cart look like the same
 * origin (localhost:4400), catalog and cart share the same localStorage
 * bucket — a small trick that lets catalog write to the cart without any
 * network round-trip. In production, cross-MFE state usually lives on the
 * server (cart-svc) instead.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.slug === item.slug);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.slug === item.slug ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeItem: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      updateQuantity: (slug, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.slug !== slug)
              : state.items.map((i) =>
                  i.slug === slug ? { ...i, quantity } : i,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'etege-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Sample items so the empty-state doesn't dominate the first visit.
 * Never call in prod — this is purely dev ergonomics.
 */
export const SAMPLE_ITEMS: Omit<CartItem, 'quantity'>[] = [
  {
    slug: 'etege-signature-bridal-gown',
    name: 'Etege signature bridal gown',
    price: 2800,
    swatch: { from: 'var(--color-ivory)', to: 'var(--color-cream)' },
  },
  {
    slug: 'bridal-netela',
    name: 'Bridal netela',
    price: 650,
    swatch: { from: 'var(--color-ivory)', to: 'var(--color-sage-soft)' },
  },
];
