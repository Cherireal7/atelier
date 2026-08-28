import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader, CardTitle } from '@atelier/ui';
import { categoryLabel, formatPrice, getProducts } from '../lib/products';

/**
 * Force SSR on every request. Default in Next 15 App Router is "try to
 * statically generate"; that would defeat the whole point of the demo.
 * With this, `Date.now()` below is a fresh server timestamp per request.
 */
export const dynamic = 'force-dynamic';

export default async function CollectionPage() {
  const products = await getProducts();
  const renderedAt = new Date().toISOString();

  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-16 md:py-20">
        <p className="font-mono text-caption uppercase tracking-widest text-muted">
          The collection · SS26 · Addis Ababa
        </p>
        <h1 className="mt-3 font-display text-headline text-ink md:text-display md:leading-none">
          Sixteen pieces per season.
        </h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          Bridal, ceremonial, and a small ready-to-wear capsule. Every gown is
          fitted twice before delivery — in Addis, or over video if you're in
          the diaspora.
        </p>
        <p className="mt-6 inline-block rounded-pill bg-cream px-3 py-1 font-mono text-caption text-muted">
          SSR · rendered {renderedAt}
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link
            key={p.slug}
            href={`/collection/${p.slug}`}
            className="group block"
          >
            <Card
              as="article"
              elevated
              className="h-full transition-transform group-hover:-translate-y-1"
            >
              <div
                className="aspect-[4/5] w-full rounded-t-lg"
                style={{
                  background: `linear-gradient(140deg, ${p.swatch.from}, ${p.swatch.to})`,
                }}
                aria-hidden="true"
              >
                <div className="flex h-full items-end p-6">
                  <span className="font-display text-headline leading-none text-ink/80">
                    {p.name.split(' ')[0]}
                  </span>
                </div>
              </div>
              <CardHeader>
                <p className="font-mono text-caption uppercase tracking-widest text-muted">
                  {categoryLabel(p.category)}
                </p>
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardBody className="pt-0 text-body text-muted">
                {p.headline}
              </CardBody>
              <CardFooter>
                <span className="font-display text-title text-ink">
                  {formatPrice(p.price)}
                </span>
                <span className="text-caption text-muted">
                  {p.deliveryWeeks} wks
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
