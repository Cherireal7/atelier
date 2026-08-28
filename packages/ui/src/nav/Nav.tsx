import type { AnchorHTMLAttributes } from 'react';
import { Button } from '../button';
import { cn } from '../utils/cn';

/**
 * The shell chrome — a shared header that every micro frontend renders so the
 * user sees the same brand + nav regardless of which MFE is serving the page.
 *
 * Uses plain <a> tags on purpose: cross-MFE navigation is a full page load
 * (either through Nginx or across ports in dev). If we used framework-
 * specific <Link>, this component couldn't live in @atelier/ui.
 */

const DEFAULT_ROUTES = [
  { href: '/collection', label: 'Collection' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/concierge', label: 'Concierge' },
];

export interface NavProps {
  routes?: { href: string; label: string }[];
  brandHref?: string;
  className?: string;
}

export function Nav({
  routes = DEFAULT_ROUTES,
  brandHref = '/',
  className,
}: NavProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 border-b border-ink/10 bg-ivory/85 backdrop-blur',
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <BrandLink href={brandHref}>Etege</BrandLink>
        <nav className="flex items-center gap-1">
          {routes.map((r) => (
            <Button key={r.href} variant="ghost" size="sm" asChild>
              <a href={r.href}>{r.label}</a>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function BrandLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className="font-display text-title font-bold tracking-tight text-ink"
      {...rest}
    >
      {children}
    </a>
  );
}
