import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind class strings with clsx-style conditionals, then de-duplicate
 * conflicts (e.g. `px-2 px-4` → `px-4`). Standard shadcn/ui pattern.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
