import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Chip, Typography, useMediaQuery } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircleIcon from '@mui/icons-material/Circle';
import imdb from '../assets/images/imdb.svg';
import rotten from '../assets/images/rotten.svg';
import { FilmByIdResponse, apiKey, baseURL } from "../api/omdbAPI/omdbAPI";
import { useEffect, useState } from "react";

const FilmDetail = () => {
  const url = baseURL;
  const key = apiKey;
  const [film, setFilm] = useState<FilmByIdResponse>({} as FilmByIdResponse);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const navigate = useNavigate();
  let { filmId } = useParams();
  const matches = useMediaQuery('(min-width:800px)');
  
  const routeChange = () =>{ 
    const path = `/films`; 
    navigate(path);
  };

  const getFilmById = async () => {
    setLoading(true);
    try {
      const omdbByIdAPI = await fetch(`${url}?apikey=${key}&i=${filmId}`);
      const response: FilmByIdResponse = await omdbByIdAPI.json();
      setFilm(response);
      setError(false);
    } catch (err: unknown) {
      setFilm({} as FilmByIdResponse);
      setError(true);
    } finally {
      setLoading(false);
    };
  };

  const filterRating = (sourceRating: string) => {
    const filterList = (film.Ratings || []).filter((rate) => rate.Source === sourceRating);

    if (filterList && filterList.length > 0) {
      return filterList[0].Value;
    } else {
      return 'N/A';
    };
  };

  useEffect(() => {
    getFilmById();
  }, []);
  
  return (
    <>
      {loading && (
        <Box>
          <Typography variant="h5">Loading...</Typography>
        </Box>
      )}
      {!loading && (
        <>
          {!error && (
            <Box
              display="flex"
              width="100%"
              height="100%"
              flexDirection="column"
              gap="20px"
            >
              <Box display="flex" flexDirection="column">
                <KeyboardBackspaceIcon sx={{ color: '#7B8C98', cursor: 'pointer' }} onClick={routeChange} />
                <Box display="flex" alignItems="center" gap="10px">
                  <Typography sx={{color: '#7B8C98' }}>{film.Runtime}</Typography>
                  <CircleIcon sx={{color: '#7B8C98', fontSize: '5px' }} />
                  <Typography sx={{color: '#7B8C98' }}>{film.Year}</Typography>
                  <CircleIcon sx={{color: '#7B8C98', fontSize: '5px' }} />
                  <Chip 
                    label={film.Rated} 
                    size="small" 
                    sx={{
                      color: '#011016', 
                      background: '#7B8C98', 
                      fontSize: '12px', 
                      fontWeight: '700', 
                      borderRadius: '4px' 
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" gap="10px" flexDirection={matches ? 'row' : 'column'}>
                <Box 
                  display="flex" 
                  flexDirection="column" 
                  gap="10px" 
                  width={matches ? '60%' : '100%'}
                >
                  <Typography variant="h1" fontSize="60px" fontWeight="bold">{film.Title}</Typography>
                  <Box display="flex" gap="10px">
                    <Box border="solid 1px #171C21" display="flex" borderRadius="4px">
                      <Box 
                        display="flex" 
                        width="52px" 
                        sx={{ 
                          background: '#FF9B39', 
                          borderTopLeftRadius: '4px', 
                          borderBottomLeftRadius: '4px',
                          placeItems: 'center',
                          placeContent: 'center',
                        }}
                      >
                        <img src={imdb} alt="imdb logo" />
                      </Box>
                      <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        width="58px"
                        sx={{ 
                          borderTopRightRadius: '4px', 
                          borderBottomRightRadius: '4px',
                        }}
                      >
                        <Typography fontSize="12px">
                          {filterRating('Internet Movie Database')}
                        </Typography>
                      </Box>
                    </Box>
                    <Box border="solid 1px #171C21" display="flex" borderRadius="4px">
                      <Box 
                        display="flex"
                        width="42px" 
                        sx={{ 
                          background: '#F93A1E', 
                          borderTopLeftRadius: '4px', 
                          borderBottomLeftRadius: '4px',
                          placeItems: 'center',
                          placeContent: 'center',
                        }}
                      >
                        <img src={rotten} alt="rotten logo" />
                      </Box>
                      <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        width="39px"
                        sx={{ 
                          borderTopRightRadius: '4px',
                          borderBottomRightRadius: '4px',
                        }}
                      >
                        <Typography fontSize="12px">
                          {filterRating('Rotten Tomatoes')}
                        </Typography>
                      </Box>
                    </Box>
                    <Box 
                      border="solid 1px #171C21" 
                      display="flex" 
                      borderRadius="4px"
                      gap="2px" 
                      padding="4px" 
                      alignItems="center"
                    >
                      <FavoriteBorderIcon sx={{ color: '#7B8C98', fontSize: '16px' }} />
                      <Typography fontSize="12px" sx={{ color: '#7B8C98' }}>
                        Add to favorites
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography fontWeight="500" sx={{ color: '#7B8C98'}}>Plot</Typography>
                    <Typography>{film.Plot}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography fontWeight="500" sx={{ color: '#7B8C98'}}>Cast</Typography>
                      {(film.Actors || '').split(',').map((actor, index) => (
                        <Typography key={index}>{actor}</Typography>
                      ))}
                    </Box>
                    <Box>
                      <Typography fontWeight="500" sx={{ color: '#7B8C98'}}>Genre</Typography>
                      {(film.Genre || '').split(',').map((eachGenre, index) => (
                        <Typography key={index}>{eachGenre}</Typography>
                      ))}
                    </Box>
                    <Box>
                      <Typography fontWeight="500" sx={{ color: '#7B8C98'}}>Director</Typography>
                      {(film.Director || '').split(',').map((eachDirector, index) => (
                        <Typography key={index}>{eachDirector}</Typography>
                      ))}
                    </Box>
                  </Box>
                </Box>
                <Box 
                  borderRadius="8px" 
                  alignSelf="center" 
                  width={matches ? '40%' : '100%'}
                  display="flex"
                  justifyContent="center"
                >
                  <Box component="img" src={film.Poster} borderRadius="8px"/>
                </Box>
              </Box>
            </Box>
          )}
          {error && (
            <Alert severity="error">We got a problem to fetch the information, try again later.</Alert>
          )}
        </>
      )}
    </>
  );
};
  
export default FilmDetail;