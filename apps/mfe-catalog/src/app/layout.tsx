import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Nav } from '@atelier/ui';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-loaded',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Collection — Etege',
  description:
    'Bridal and ceremonial pieces from the Etege atelier, made to measure in Addis Ababa.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-ivory text-ink antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
