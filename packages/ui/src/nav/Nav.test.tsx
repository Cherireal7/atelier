import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders the brand link pointing to /', () => {
    render(<Nav />);
    const brand = screen.getByRole('link', { name: /etege/i });
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders the four default routes as plain anchors', () => {
    render(<Nav />);
    for (const label of ['Collection', 'Cart', 'Checkout', 'Concierge']) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', `/${label.toLowerCase()}`);
    }
  });

  it('accepts a custom routes list', () => {
    render(<Nav routes={[{ href: '/atelier', label: 'Atelier' }]} />);
    expect(screen.getByRole('link', { name: 'Atelier' })).toHaveAttribute(
      'href',
      '/atelier',
    );
    expect(screen.queryByRole('link', { name: 'Collection' })).toBeNull();
  });
});
