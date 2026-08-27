import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './Card';

describe('Card', () => {
  it('renders children inside a div by default', () => {
    render(<Card data-testid="card">hello</Card>);
    const el = screen.getByTestId('card');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveTextContent('hello');
  });

  it('can render as an article for product tiles', () => {
    render(
      <Card as="article" data-testid="card">
        x
      </Card>,
    );
    expect(screen.getByTestId('card').tagName).toBe('ARTICLE');
  });

  it('swaps to the lifted shadow when elevated', () => {
    render(
      <Card elevated data-testid="card">
        x
      </Card>,
    );
    const el = screen.getByTestId('card');
    expect(el).toHaveClass('shadow-lift');
    expect(el).not.toHaveClass('shadow-subtle');
  });

  it('composes header/title/description/body/footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Netela</CardTitle>
          <CardDescription>Silk with fine tibeb</CardDescription>
        </CardHeader>
        <CardBody>Made to measure in the Addis atelier.</CardBody>
        <CardFooter>
          <span>$1,800</span>
        </CardFooter>
      </Card>,
    );
    expect(screen.getByRole('heading', { name: /netela/i })).toBeInTheDocument();
    expect(screen.getByText(/silk with fine tibeb/i)).toBeInTheDocument();
    expect(screen.getByText(/addis atelier/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1,800/)).toBeInTheDocument();
  });
});
