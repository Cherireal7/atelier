import Link from 'next/link';
import { Button } from '@atelier/ui';

const routes = [
  { href: '/collection', label: 'Collection' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/concierge', label: 'Concierge' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-ivory/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-title font-bold tracking-tight text-ink"
        >
          Etege
        </Link>
        <nav className="flex items-center gap-1">
          {routes.map((r) => (
            <Button key={r.href} variant="ghost" size="sm" asChild>
              <Link href={r.href}>{r.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
