import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import logo from '../assets/images/logo.svg';
import Logo from "../components/logo/Logo";
import Header from "../components/header/Header";
import { apiKey, baseURL } from "../api/omdbAPI";
import { SearchFilmList, APIResponse } from "../models/omdbAPI";

const Films = (): React.ReactElement => {
  const url: string = baseURL;
  const key: string = apiKey;
  const navigate = useNavigate();
  const [isMouseEnter, setIsMouseEnter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filmList, setFilmList] = useState<SearchFilmList[]>([] as SearchFilmList[]);
  const boxAttr = {
    mouseEnter: {
      boxShadow: 'inset 0 0 0 2000px rgba(25, 34, 40, 0.9)',
    },
  };

  const getSearchFilms = async (): Promise<void> => {
    if (search) {
      setLoading(true);
      try {
        const omdbAPI = await fetch(`${url}?apikey=${key}&s=${search}`);
        const response: APIResponse<SearchFilmList[]> = await omdbAPI.json();
        setFilmList(response.Search);
        setError(false);
      } catch (err: unknown) {
        setFilmList([] as SearchFilmList[]);
        setError(true);
      } finally {
        setLoading(false);
      };
    };
  };

  const handleClickSearch = (): void => {
    getSearchFilms();
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setError(null);
      setFilmList([] as SearchFilmList[]);
    };
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      getSearchFilms();
    };
  };

  const handleMouseEnter = (id: string): void => {
    setIsMouseEnter(id);
  };

  const handleMouseLeave = (): void => {
    setIsMouseEnter('');
  };

  const routeChange = (id: string): void => {
    const path = `/films/${id}`; 
    navigate(path);
  };

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      textAlign="center"
      flexDirection="column"
      gap="20px"
    >
      <Header 
        handleChangeSearch={handleChangeSearch}
        handleClickSearch={handleClickSearch}
        handleKeyDown={handleKeyDown}
        search={search}
      />
      {loading && (
        <Box>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      )}
      {!loading  && (
        <>
          {error === null && (
            <Box 
              display="flex" 
              flexDirection="column" 
              alignItems="center" 
              justifyContent="center" 
              height="inherit" 
              gap="10px"
            >
              <Logo />
              <Typography variant="h5" fontWeight="bold">Don't know what to search?</Typography>
              <Typography variant="body2">Here's an offer you can't refuse</Typography>
            </Box>
          )}
          {error === false && (filmList || []).length > 0 && (
            <Box display="inline-flex" flexWrap="wrap" width="100%" gap="10px">
              {filmList.map((film: SearchFilmList) => (
                <Box 
                  key={film.imdbID}
                  width="140px" 
                  height="198px" 
                  borderRadius="8px" 
                  sx={{ cursor: 'pointer' }}
                  onMouseEnter={() => handleMouseEnter(film.imdbID)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Box 
                    width="100%" 
                    height="100%" 
                    borderRadius="8px"
                    sx={{ 
                      background: `url(${film.Poster !== 'N/A' ? film.Poster : logo}) center/cover`, 
                      ...isMouseEnter === film.imdbID && boxAttr.mouseEnter 
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    onClick={() => routeChange(film.imdbID)}
                  >
                    {isMouseEnter === film.imdbID && (
                      <>
                        <Box alignSelf="flex-end" padding="5px">
                          <FavoriteBorderIcon sx={{ color: '#FFFFFF' }} />
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" padding="5px">
                          <Typography variant="body1" fontWeight="700">{film.Title}</Typography>
                          <Typography variant="body2">{film.Year}</Typography>
                        </Box>
                      </>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {error === false && (filmList || []).length === 0 && (
            <Alert severity="info">Movie not found.</Alert>
          )}
          {error === true && (filmList || []).length === 0 && (
            <Alert severity="error">We got a problem to fetch the information, try again later.</Alert>
          )}
        </>
      )}
    </Box>    
  );
};
  
export default Films;