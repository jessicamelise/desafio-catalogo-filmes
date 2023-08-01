import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { HeaderProps } from '../../../models/header';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

const propsMock: HeaderProps = {
  handleChangeSearch: jest.fn(),
  handleClickSearch: jest.fn(),
  handleKeyDown: jest.fn(),
  search: '',
};

test('renders Header', () => {
  render(<Header {...propsMock} />);
  const inputSearch = screen.getByPlaceholderText('search movie...');
  const iconSearch = screen.getByTestId('SearchIcon');
  const buttonLogout = screen.getByText('Log out');
  
  expect(inputSearch).toBeInTheDocument();
  expect(iconSearch).toBeInTheDocument();
  expect(buttonLogout).toBeInTheDocument();
  
  userEvent.type(inputSearch, 'teste');
  
  expect(propsMock.handleChangeSearch).toHaveBeenCalled();

  userEvent.keyboard('{enter}');
  
  expect(propsMock.handleKeyDown).toHaveBeenCalled();
  
  userEvent.click(iconSearch);
  
  expect(propsMock.handleClickSearch).toHaveBeenCalled();
  
  userEvent.click(buttonLogout);
  
  expect(mockUseNavigate).toHaveBeenCalled();
});
