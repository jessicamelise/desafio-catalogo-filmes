import { useState } from "react";
import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, Typography,  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/logo.svg';
import Logo from "../components/logo/Logo";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Films = () => {
  const navigate = useNavigate();
  const [isMouseEnter, setIsMouseEnter] = useState('');
  const filmList = [
    {
      id: '0',
      name: 'teste 0',
      year: '2010'
    },
    {
      id: '1',
      name: 'teste 1',
      year: '2011'
    },
    {
      id: '2',
      name: 'teste 2',
      year: '2012'
    },
    {
      id: '3',
      name: 'teste 3',
      year: '2013'
    },
    {
      id: '4',
      name: 'teste 4',
      year: '2014'
    },
    {
      id: '5',
      name: 'teste 5',
      year: '2015'
    },
    {
      id: '6',
      name: 'teste 6',
      year: '2016'
    },
    {
      id: '7',
      name: 'teste 7',
      year: '2017'
    },
    {
      id: '8',
      name: 'teste 8',
      year: '2018'
    },
  ];
  const boxAttr = {
    mouseEnter: {
      boxShadow: 'inset 0 0 0 2000px rgba(25, 34, 40, 0.9)',
    },
  };

  const handleMouseEnter = (id: string) => {
    setIsMouseEnter(id);
  };

  const handleMouseLeave = () => {
    setIsMouseEnter('');
  };

  const routeChange = () =>{ 
    const path = `/`; 
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
      <Box 
        component="header" 
        display="flex" 
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>Hello /Nome/</Typography>
        <Button variant="contained" onClick={routeChange}>Log out</Button>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiInputBase-colorPrimary': { background: 'white' },
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="search movie..."
          value=""
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {filmList.length > 0 ? (
        <Box display="inline-flex" flexWrap="wrap" width="100%" gap="10px">
          {filmList.map((film) => (
            <Box 
              key={film.id}
              width="140px" 
              height="198px" 
              borderRadius="8px" 
              sx={{ cursor: 'pointer' }}
              onMouseEnter={() => handleMouseEnter(film.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Box 
                width="100%" 
                height="100%" 
                borderRadius="8px"
                sx={{ 
                  background: `url(${logo}) center/cover`, 
                  ...isMouseEnter === film.id && boxAttr.mouseEnter 
                }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                {isMouseEnter === film.id && (
                  <>
                    <Box alignSelf="flex-end" padding="5px">
                      <FavoriteBorderIcon sx={{ color: '#FFFFFF' }} />
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="flex-start" padding="5px">
                      <Typography variant="body1" fontWeight="700">{film.name}</Typography>
                      <Typography variant="body2">{film.year}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          ))}
        </Box>
        ) : (
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
      
    </Box>    
  );
}
  
export default Films;