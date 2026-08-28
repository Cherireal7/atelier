/**
 * Product data for the catalog MFE. In Step 9 this becomes a fetch to the
 * BFF (which aggregates product-svc); until then, static data lives here.
 *
 * Prices and framing sourced from the Mesafint research report §22 — the
 * bridal-and-ceremonial-led positioning we picked for Etege.
 */

export type ProductCategory = 'bridal' | 'ceremonial' | 'ready-to-wear' | 'accessories';

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  /** USD, whole dollars — pretend $ throughout the sandbox. */
  price: number;
  headline: string;
  description: string;
  materials: string;
  /** How long from order to delivery for a made-to-measure piece. */
  deliveryWeeks: number;
  /** Two visual palette hints used to render a gradient card in place of a photo. */
  swatch: { from: string; to: string };
}

const PRODUCTS: Product[] = [
  {
    slug: 'etege-signature-bridal-gown',
    name: 'Etege signature bridal gown',
    category: 'bridal',
    price: 2800,
    headline: 'The house bridal silhouette.',
    description:
      'A floor-length gown in mid-weight handwoven Ethiopian cotton with the signature Etege hem detail. Two fittings included in Addis; final fitting via video for diaspora clients.',
    materials: 'Handwoven cotton · silk-blend lining · house tibeb accent',
    deliveryWeeks: 10,
    swatch: { from: 'var(--color-ivory)', to: 'var(--color-cream)' },
  },
  {
    slug: 'reception-second-look',
    name: 'Reception second-look dress',
    category: 'bridal',
    price: 2000,
    headline: 'A shorter silhouette for the reception.',
    description:
      'Mid-weight woven cotton, contemporary tea-length silhouette, coordinated to the signature bridal gown but built for dancing.',
    materials: 'Woven cotton · silk sash · signature hem',
    deliveryWeeks: 8,
    swatch: { from: 'var(--color-cream)', to: 'var(--color-gold-soft)' },
  },
  {
    slug: 'ceremonial-gabi',
    name: 'Ceremonial gabi (mother-of-the-bride)',
    category: 'ceremonial',
    price: 1600,
    headline: 'A handwoven ceremonial piece for the mother of the bride.',
    description:
      'Silk-blend for weight and drape. Ships with a coordinating netela shawl for church and reception.',
    materials: 'Silk-blend · handwoven tibeb border · linen underlay',
    deliveryWeeks: 6,
    swatch: { from: 'var(--color-gold-soft)', to: 'var(--color-gold)' },
  },
  {
    slug: 'bridal-netela',
    name: 'Bridal netela (silk with fine tibeb)',
    category: 'bridal',
    price: 650,
    headline: 'A ceremonial shawl worked in silk.',
    description:
      'Every Etege bridal look ships with a house netela. Sold separately here for guests, bridesmaids, and mothers of the bride.',
    materials: 'Silk · hand-worked tibeb edge',
    deliveryWeeks: 4,
    swatch: { from: 'var(--color-ivory)', to: 'var(--color-sage-soft)' },
  },
  {
    slug: 'rehearsal-linen-dress',
    name: 'Rehearsal-dinner linen dress',
    category: 'ready-to-wear',
    price: 1100,
    headline: 'Linen-cotton for the day-two dinner.',
    description:
      'A relaxed, packable second-city piece. Same signature seam-work as the bridal gowns, at a weekday weight.',
    materials: 'Linen-cotton blend · mother-of-pearl buttons',
    deliveryWeeks: 4,
    swatch: { from: 'var(--color-sage-soft)', to: 'var(--color-sage)' },
  },
  {
    slug: 'bridesmaid-coordinated',
    name: 'Bridesmaid coordinated piece',
    category: 'bridal',
    price: 900,
    headline: 'Coordinated to the house bridal palette.',
    description:
      'Available in a small palette range — ivory, cream, sage, deep wine — so a bridal party photographs as one composed group.',
    materials: 'Woven cotton · silk sash',
    deliveryWeeks: 6,
    swatch: { from: 'var(--color-wine)', to: 'var(--color-wine-deep)' },
  },
  {
    slug: 'etege-scarf',
    name: 'Etege scarf (quarterly edition)',
    category: 'accessories',
    price: 260,
    headline: 'Hand-embroidery in the house palette.',
    description:
      'One of three quarterly editions — each colour dropped in a limited numbered run of forty pieces.',
    materials: 'Silk-blend · hand embroidery',
    deliveryWeeks: 2,
    swatch: { from: 'var(--color-gold)', to: 'var(--color-wine)' },
  },
  {
    slug: 'netela-ready-to-wear',
    name: 'Netela ready-to-wear dress',
    category: 'ready-to-wear',
    price: 1800,
    headline: 'A ready-to-wear echo of the bridal netela.',
    description:
      'For the sister of the bride, the guest, the woman who wants a piece of the house at a non-bridal price point.',
    materials: 'Woven cotton · silk-blend tibeb border',
    deliveryWeeks: 4,
    swatch: { from: 'var(--color-cream)', to: 'var(--color-ivory)' },
  },
];

/** In-memory delay so you can feel the SSR pause in the browser. */
async function simulateServerLatency(ms = 40): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

export async function getProducts(): Promise<Product[]> {
  await simulateServerLatency();
  return PRODUCTS;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await simulateServerLatency();
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function categoryLabel(c: ProductCategory): string {
  switch (c) {
    case 'bridal':
      return 'Bridal';
    case 'ceremonial':
      return 'Ceremonial';
    case 'ready-to-wear':
      return 'Ready to wear';
    case 'accessories':
      return 'Accessories';
  }
}
