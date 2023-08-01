import { render, screen, waitFor } from '@testing-library/react';
import FilmDetail from '../FilmDetail';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockUseNavigate,
}));

const filmDetail = {
  Title: "Laisse tes mains sur mes hanches",
  Year: "2003",
  Rated: "N/A",
  Released: "02 Apr 2003",
  Runtime: "101 min",
  Genre: "Comedy, Romance",
  Director: "Chantal Lauby",
  Writer: "Chantal Lauby",
  Actors: "Chantal Lauby, Claude Perron, Rossy de Palma",
  Plot: "Odile has 42 years, an actress and single mother. One day, her 18 year old daughter decided to live alone. All of a sudden, alone in her empty house, the anguish takes over. But she decided to do something about it. After some nig...",
  Language: "French",
  Country: "France",
  Awards: "N/A",
  Poster: "test",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "5.7/10"
    }
  ],
  Metascore: "N/A",
  imdbRating: "5.7",
  imdbVotes: "618",
  imdbID: "tt0339279",
  Type: "movie",
  DVD: "N/A",
  BoxOffice: "N/A",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
};

const mockFetchSuccess: any = async () => {
  return {
    status: 200,
    json: async () => filmDetail,
  };
};

const mockFetchError: any = async () => {
  return {
    status: 400,
    json: () => Promise.resolve({ success: false, error: 'error' }),
  };
};

test('renders FilmDetail success request', () => {
  let fetchMock: any = undefined;
  fetchMock = jest.spyOn(window, "fetch").mockImplementation(mockFetchSuccess)
  render(<FilmDetail />);

  waitFor(async () => {
    const title = screen.getByText(`${filmDetail.Title}`);
    const plot = screen.getByText(`${filmDetail.Plot}`);
    const iconReturn = screen.getByTestId('KeyboardBackspaceIcon');
    
    expect(title).toBeInTheDocument();
    expect(plot).toBeInTheDocument();
    expect(iconReturn).toBeInTheDocument();
  
    userEvent.click(iconReturn);
  
    expect(mockUseNavigate).toHaveBeenCalled();
  });
});

test('renders FilmDetail error request', async () => {
  let fetchMock: any = undefined;
  fetchMock = jest.spyOn(window, "fetch").mockImplementation(mockFetchError)

  render(<FilmDetail />);

  waitFor(async () => {
    const alert = await screen.findByText(`We got a problem to fetch the information, try again later.`);
    expect(alert).toBeInTheDocument();
  });

  jest.clearAllMocks();
});