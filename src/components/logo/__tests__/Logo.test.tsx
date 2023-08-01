import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

test('renders Logo', () => {
  render(<Logo />);
  const imgLogo = screen.getByAltText('logo image');
  
  expect(imgLogo).toBeInTheDocument();
  expect(imgLogo).toHaveAttribute('src', 'logo.svg');
});
