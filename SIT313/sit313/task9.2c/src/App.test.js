import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome to DEV@Deakin', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to dev@deakin/i);
  expect(linkElement).toBeInTheDocument();
});
