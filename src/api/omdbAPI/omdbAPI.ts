export const apiKey = process.env.REACT_APP_APIKey
export const baseURL = process.env.REACT_APP_APIBaseURL

export interface APIResponse<T> {
  Search: T;
  status: number;
};

export interface SearchFilmResponse {
  Search: SearchFilmList[];
};

export interface SearchFilmList {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export interface FilmByIdResponse {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: FilmRatingList[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
};

export interface FilmRatingList {
  Source: string;
  Value: string;
};
