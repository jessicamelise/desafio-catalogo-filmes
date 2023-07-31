import { useNavigate } from "react-router-dom";
import { Box, Chip, Typography, useMediaQuery } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircleIcon from '@mui/icons-material/Circle';
import imdb from '../assets/images/imdb.svg';
import rotten from '../assets/images/rotten.svg';

const FilmDetail = () => {
  const film = {
    Title: "Guardians of the Galaxy Vol. 2",
    Year: "2017",
    Rated: "PG-13",
    Released: "05 May 2017",
    Runtime: "136 min",
    Genre: "Action, Adventure, Comedy",
    Director: "James Gunn",
    Writer: "James Gunn, Dan Abnett, Andy Lanning",
    Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
    Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
    Language: "English",
    Country: "United States",
    Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
    Poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "7.6/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "85%"
      },
      {
        Source: "Metacritic",
        Value: "67/100"
      },
    ],
    Metascore: "67",
    imdbRating: "7.6",
    imdbVotes: "725,527",
    imdbID: "tt3896198",
    Type: "movie",
    DVD: "22 Aug 2017",
    BoxOffice: "$389,813,101",
    Production: "N/A",
    Website: "N/A",
    Response: "True",
  };
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:800px)');
  
  const routeChange = () =>{ 
    const path = `/films`; 
    navigate(path);
  };
  
  return (
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
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography variant="h1" fontSize="60px" fontWeight="bold">{film.Title}</Typography>
          <Box display="flex" gap="10px">
            <Box border="solid 1px #171C21" display="flex" borderRadius="4px">
              <Box 
                display="flex"
                height="32px" 
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
                  {film.Ratings.filter((rate) => rate.Source === 'Internet Movie Database')[0].Value || "N/A"}
                </Typography>
              </Box>
            </Box>
            <Box border="solid 1px #171C21" display="flex" borderRadius="4px">
              <Box 
                display="flex"
                height="32px" 
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
                  {film.Ratings.filter((rate) => rate.Source === 'Rotten Tomatoes')[0].Value || "N/A"}
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
              {film.Actors.split(',').map((actor, index) => (
                <Typography key={index}>{actor}</Typography>
              ))}
            </Box>
            <Box>
              <Typography fontWeight="500" sx={{ color: '#7B8C98'}}>Genre</Typography>
              {film.Genre.split(',').map((eachGenre, index) => (
                <Typography key={index}>{eachGenre}</Typography>
              ))}
            </Box>
            <Box>
              <Typography fontWeight="500" sx={{ color: '#7B8C98'}}>Director</Typography>
              {film.Director.split(',').map((eachDirector, index) => (
                <Typography key={index}>{eachDirector}</Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Box borderRadius="8px" alignSelf="center">
          <Box component="img" src={film.Poster} borderRadius="8px" />
        </Box>
      </Box>
    </Box>    
  );
};
  
export default FilmDetail;