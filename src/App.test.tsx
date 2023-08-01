import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const inputEmail = screen.getByPlaceholderText('email');
  expect(inputEmail).toBeInTheDocument();
});
