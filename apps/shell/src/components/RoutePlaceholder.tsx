import Link from 'next/link';
import { Button } from '@atelier/ui';

export function RoutePlaceholder({
  route,
  tag,
  strategy,
  transport,
  arrives,
}: {
  route: string;
  tag: string;
  strategy: string;
  transport: string;
  arrives: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="font-mono text-caption uppercase tracking-widest text-muted">
        {route}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <h1 className="font-display text-headline text-ink">Not built yet</h1>
        <span className="rounded-pill bg-wine px-3 py-1 text-caption font-semibold uppercase tracking-widest text-ivory">
          {tag}
        </span>
      </div>
      <p className="mt-6 text-lead text-muted">
        This route will be a separate micro frontend loaded into the shell via
        Module Federation. When it lands you'll see the same layout you're
        looking at now, just with the below section swapped in.
      </p>
      <dl className="mt-10 grid grid-cols-1 gap-6 rounded-lg border border-gold/30 bg-cream/50 p-6 md:grid-cols-3">
        <div>
          <dt className="text-caption uppercase tracking-widest text-muted">
            Rendering
          </dt>
          <dd className="mt-1 font-display text-title text-ink">{strategy}</dd>
        </div>
        <div>
          <dt className="text-caption uppercase tracking-widest text-muted">
            Transport
          </dt>
          <dd className="mt-1 font-display text-title text-ink">{transport}</dd>
        </div>
        <div>
          <dt className="text-caption uppercase tracking-widest text-muted">
            Arrives in
          </dt>
          <dd className="mt-1 font-display text-title text-ink">{arrives}</dd>
        </div>
      </dl>
      <div className="mt-10">
        <Button variant="secondary" asChild>
          <Link href="/">← Back to shell home</Link>
        </Button>
      </div>
    </div>
  );
}
