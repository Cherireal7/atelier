import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section';
  elevated?: boolean;
}

/**
 * Card — a surface. Defaults to a `<div>` on cream with a subtle shadow.
 * Set `as="article"` for a product tile, `elevated` for the hover-lifted variant.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { as: Component = 'div', elevated = false, className, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'rounded-lg bg-cream text-ink',
        elevated ? 'shadow-lift transition-shadow hover:shadow-hover' : 'shadow-subtle',
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1 px-6 pt-6', className)}
        {...props}
      />
    );
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn('font-display text-title leading-tight text-ink', className)}
        {...props}
      />
    );
  },
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...props }, ref) {
    return <p ref={ref} className={cn('text-body text-muted', className)} {...props} />;
  },
);

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn('px-6 py-4', className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between px-6 pb-6 pt-2', className)}
        {...props}
      />
    );
  },
);
