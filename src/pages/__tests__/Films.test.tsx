import { render, screen, waitFor } from '@testing-library/react';
import Films from '../Films';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

const emptyList = {
  Source: [],
};

const itemsList = {
  Source: [
    {
      Title: "Some Test Film",
      Year: "1973–1978",
      imdbID: "teste000",
      Type: "series",
      Poster: "test"
    },
  ],
};

const mockFetchSucceessEmpty: any = async () => {
  return {
    status: 200,
    json: async () => emptyList,
  };
};

const mockFetchSucceessWithItems: any = async () => {
  return {
    status: 200,
    json: async () => itemsList,
  };
};

const mockFetchError: any = async () => {
  return {
    status: 400,
    json: () => Promise.resolve({ success: false, error: 'error' }),
  };
};

test('renders Films with no request', () => {
  render(<Films />);
  const textHelperTitle = screen.getByText(`Don't know what to search?`);
  const textHelperDescription = screen.getByText(`Here's an offer you can't refuse`);
  
  expect(textHelperTitle).toBeInTheDocument();
  expect(textHelperDescription).toBeInTheDocument();
});

test('renders Films with success request but empty list', async () => {
  let fetchMock: any = undefined;
  fetchMock = jest.spyOn(window, "fetch").mockImplementation(mockFetchSucceessEmpty)

  render(<Films />);

  const inputSearch = screen.getByPlaceholderText('search movie...');
  userEvent.type(inputSearch, 'teste');

  act(() => {
    userEvent.keyboard('{enter}');
  });

  expect(fetchMock).toHaveBeenCalled();

  waitFor(async () => {
    const alert = await screen.findByText(`Movie not found.`);
    expect(alert).toBeInTheDocument();
  });

  jest.clearAllMocks();
});

test('renders Films with success request with items list', async () => {
  let fetchMock: any = undefined;
  fetchMock = jest.spyOn(window, "fetch").mockImplementation(mockFetchSucceessWithItems)

  render(<Films />);

  const inputSearch = screen.getByPlaceholderText('search movie...');
  userEvent.type(inputSearch, 'teste');

  act(() => {
    userEvent.keyboard('{enter}');
  });

  expect(fetchMock).toHaveBeenCalled();

  waitFor(async () => {
    const img = await screen.findByTestId(`${itemsList.Source[0].imdbID}-img`);
    expect(img).toBeInTheDocument();

    userEvent.click(img);
    expect(mockUseNavigate).toHaveBeenCalled();
  });

  jest.clearAllMocks();
});

test('renders Films with error request', async () => {
  let fetchMock: any = undefined;
  fetchMock = jest.spyOn(window, "fetch").mockImplementation(mockFetchError)

  render(<Films />);

  const inputSearch = screen.getByPlaceholderText('search movie...');
  userEvent.type(inputSearch, 'teste');

  act(() => {
    userEvent.keyboard('{enter}');
  });

  expect(fetchMock).toHaveBeenCalled();

  waitFor(async () => {
    const alert = await screen.findByText(`We got a problem to fetch the information, try again later.`);
    expect(alert).toBeInTheDocument();
  });

  jest.clearAllMocks();
});