import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children and defaults to type=button', () => {
    render(<Button>Reserve fitting</Button>);
    const btn = screen.getByRole('button', { name: /reserve fitting/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('fires onClick when activated', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies the primary variant classes by default', () => {
    render(<Button>x</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-wine');
  });

  it('honours a variant prop', () => {
    render(<Button variant="ghost">x</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-transparent');
    expect(btn).not.toHaveClass('bg-wine');
  });

  it('honours a size prop', () => {
    render(<Button size="lg">x</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-14');
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        x
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('composes with an anchor via asChild (Radix Slot)', () => {
    render(
      <Button asChild>
        <a href="/collection">Collection</a>
      </Button>,
    );
    const link = screen.getByRole('link', { name: /collection/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass('bg-wine');
    expect(link).toHaveAttribute('href', '/collection');
  });
});
