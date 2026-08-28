import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@atelier/ui';
import { categoryLabel, formatPrice, getProduct } from '../../lib/products';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  const renderedAt = new Date().toISOString();

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <Link
        href="/collection"
        className="text-caption font-semibold uppercase tracking-widest text-muted hover:text-ink"
      >
        ← Back to the collection
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
        <div
          className="aspect-[4/5] w-full rounded-lg"
          style={{
            background: `linear-gradient(140deg, ${product.swatch.from}, ${product.swatch.to})`,
          }}
          aria-hidden="true"
        >
          <div className="flex h-full items-end p-10">
            <span className="font-display text-display leading-none text-ink/80">
              {product.name.split(' ')[0]}
            </span>
          </div>
        </div>

        <div>
          <p className="font-mono text-caption uppercase tracking-widest text-muted">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 font-display text-headline text-ink">
            {product.name}
          </h1>
          <p className="mt-4 text-lead text-ink">{product.headline}</p>
          <p className="mt-6 text-body text-muted">{product.description}</p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-gold/30 pt-6">
            <div>
              <dt className="text-caption uppercase tracking-widest text-muted">
                Price
              </dt>
              <dd className="mt-1 font-display text-title text-ink">
                {formatPrice(product.price)}
              </dd>
            </div>
            <div>
              <dt className="text-caption uppercase tracking-widest text-muted">
                Made in
              </dt>
              <dd className="mt-1 font-display text-title text-ink">
                {product.deliveryWeeks} weeks
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-caption uppercase tracking-widest text-muted">
                Materials
              </dt>
              <dd className="mt-1 text-body text-ink">{product.materials}</dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="/concierge">Reserve a fitting</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/cart">Add to cart</a>
            </Button>
          </div>

          <p className="mt-10 inline-block rounded-pill bg-cream px-3 py-1 font-mono text-caption text-muted">
            SSR · rendered {renderedAt}
          </p>
        </div>
      </div>
    </div>
  );
}
