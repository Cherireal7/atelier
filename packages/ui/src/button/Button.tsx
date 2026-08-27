import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

const button = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-body font-semibold whitespace-nowrap',
    'rounded-md transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-wine text-ivory hover:bg-wine-deep shadow-lift',
        secondary: 'bg-cream text-ink hover:bg-gold-soft',
        ghost: 'bg-transparent text-ink hover:bg-cream',
        outline: 'border border-ink/15 bg-transparent text-ink hover:bg-cream',
      },
      size: {
        sm: 'h-9 px-4 text-caption',
        md: 'h-11 px-6 text-body',
        lg: 'h-14 px-8 text-lead',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  /**
   * Render as a different element (e.g. a Next `<Link>`) via Radix Slot.
   * The child element receives all button styles and props.
   */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, type, ...props },
  ref,
) {
  const Component = asChild ? Slot : 'button';
  return (
    <Component
      ref={ref}
      className={cn(button({ variant, size }), className)}
      type={asChild ? undefined : (type ?? 'button')}
      {...props}
    />
  );
});

export { button as buttonVariants };
