import Link from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '@atelier/ui';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-20 md:py-28">
        <p className="font-mono text-caption uppercase tracking-widest text-muted">
          Etege · est. 2026 · Addis Ababa
        </p>
        <h1 className="mt-4 font-display text-display leading-none text-ink">
          Heritage renewed.
        </h1>
        <p className="mt-6 max-w-xl text-lead text-muted">
          Made-to-measure bridal and ceremonial pieces in handwoven Ethiopian
          cotton. Sixteen pieces per season. Every gown fitted twice before
          delivery.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/concierge">Reserve a fitting</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/collection">Browse the collection</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-gold/40 py-16">
        <h2 className="font-display text-headline text-ink">The atelier</h2>
        <p className="mt-2 max-w-2xl text-body text-muted">
          This page is the <strong>shell</strong> — a Next.js host. The four
          routes below will each be loaded as an independent micro frontend via
          Module Federation in later steps. Right now they're placeholders.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <RouteCard
            href="/collection"
            title="/collection"
            tag="SSR"
            description="Bridal & ceremonial pieces, server-rendered for LCP."
          />
          <RouteCard
            href="/cart"
            title="/cart"
            tag="CSR"
            description="A pure client-side SPA. Notice the white-screen tradeoff."
          />
          <RouteCard
            href="/checkout"
            title="/checkout"
            tag="SSE"
            description="Order status streams from the BFF via Server-Sent Events."
          />
          <RouteCard
            href="/concierge"
            title="/concierge"
            tag="WS"
            description="Bride ↔ atelier chat over a persistent WebSocket."
          />
        </div>
      </section>

      <section className="border-t border-gold/40 py-16">
        <h2 className="font-display text-headline text-ink">
          Component preview
        </h2>
        <p className="mt-2 max-w-2xl text-body text-muted">
          Straight from{' '}
          <code className="font-mono text-caption">@atelier/ui</code> — the same
          primitives every micro frontend will use.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 font-mono text-caption uppercase tracking-widest text-muted">
              Buttons
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="mt-4">
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-caption uppercase tracking-widest text-muted">
              Inputs
            </p>
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                placeholder="bride@etege.et"
                hint="For fitting reminders."
                required
              />
              <Input
                label="Postcode"
                placeholder="1000"
                error="We don't ship there yet."
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ProductCard
            title="Netela dress"
            description="Silk with fine tibeb"
            body="Made to measure in the Addis atelier. Two fittings included; diaspora shipping in 6 weeks."
            price="$1,800"
          />
          <ProductCard
            title="Ceremonial gabi"
            description="Handwoven, deep-cream"
            body="A wedding-week second-look piece. Signature Etege hem detail."
            price="$1,400"
          />
          <ProductCard
            title="Etege scarf"
            description="Silk-blend, hand-embroidery"
            body="House colour palette, one of three quarterly editions."
            price="$260"
          />
        </div>
      </section>

      <footer className="border-t border-gold/40 py-10 text-caption text-muted">
        Etege · Addis Ababa · Bole 04 · fittings by appointment only.
      </footer>
    </div>
  );
}

function RouteCard({
  href,
  title,
  tag,
  description,
}: {
  href: string;
  title: string;
  tag: string;
  description: string;
}) {
  return (
    <Link href={href} className="group block">
      <Card elevated className="h-full transition-transform group-hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-mono text-body">{title}</CardTitle>
            <span className="rounded-pill bg-wine px-2.5 py-0.5 text-caption font-semibold uppercase tracking-widest text-ivory">
              {tag}
            </span>
          </div>
        </CardHeader>
        <CardBody className="pt-0 text-body text-muted">{description}</CardBody>
      </Card>
    </Link>
  );
}

function ProductCard({
  title,
  description,
  body,
  price,
}: {
  title: string;
  description: string;
  body: string;
  price: string;
}) {
  return (
    <Card as="article" elevated>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardBody>{body}</CardBody>
      <CardFooter>
        <span className="font-display text-title">{price}</span>
        <Button variant="secondary" size="sm">
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
