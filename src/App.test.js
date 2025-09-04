import { render, screen } from '@testing-library/react';
import App from './App';

test('renders developer profile playground header', () => {
  render(<App />);
  const headerElement = screen.getByText(/developer profile playground/i);
  expect(headerElement).toBeInTheDocument();
});