import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('associates label with the input by htmlFor / id', () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  it('renders a hint linked via aria-describedby', () => {
    render(<Input label="Email" hint="We use this to send fitting reminders." />);
    const input = screen.getByLabelText(/email/i);
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    expect(screen.getByText(/fitting reminders/i)).toHaveAttribute('id', describedBy);
  });

  it('renders an error and marks the input invalid', () => {
    render(<Input label="Email" error="Enter a valid email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent(/enter a valid email/i);
  });

  it('hides the hint when an error is present', () => {
    render(<Input label="Email" hint="Optional hint" error="Bad email" />);
    expect(screen.queryByText(/optional hint/i)).not.toBeInTheDocument();
  });

  it('marks required inputs with aria-required and a star', () => {
    render(<Input label="Email" required />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toBeRequired();
  });

  it('forwards typing to the underlying input', async () => {
    render(<Input label="Email" />);
    const input = screen.getByLabelText(/email/i) as HTMLInputElement;
    await userEvent.type(input, 'bride@etege.et');
    expect(input.value).toBe('bride@etege.et');
  });
});
