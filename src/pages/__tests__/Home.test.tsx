import { render, screen } from '@testing-library/react';
import Home from '../Home';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

test('renders Home', () => {
  render(<Home />);
  const inputEmail = screen.getByPlaceholderText('email');
  const inputPassword = screen.getByPlaceholderText('password');
  const buttonLogin = screen.getByText('Log in');
  
  expect(inputEmail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
  expect(buttonLogin).toBeInTheDocument();
  expect(buttonLogin).toBeDisabled();
  
  userEvent.type(inputEmail, 'test');
  userEvent.type(inputPassword, 'test');
  
  expect(buttonLogin).toBeEnabled();

  userEvent.click(buttonLogin);
  
  expect(mockUseNavigate).toHaveBeenCalled();
});
