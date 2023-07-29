import { Box, Button, TextField, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import logo from '../assets/images/logo.svg';
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#AA2321',
    },
    secondary: {
      main: '#7B8C98',
    },
  },
});

const Home = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:800px)');
  const boxAttr = {
    root: {
      matches: {
        alignItems: 'center',
      },
      notMatches: {
        flexDirection: 'column',
      },
    },
    img: {
      matches: {
        width: '60%'
      },
      notMatches: {
        height: '50%',
        display: 'flex',
      },
    },
    form: {
      matches: {
        width: '40%',
      },
      notMatches: {
        height: '50%',
      },
    },
  };

  const routeChange = () =>{ 
    let path = `films`; 
    navigate(path);
  }
  
  return (
    <Box 
      display="flex"
      width="100%"
      height="100%"
      textAlign="center"
      sx={matches ? boxAttr.root.matches : boxAttr.root.notMatches}
    >
      <Box sx={matches ? boxAttr.img.matches : boxAttr.img.notMatches}>
        <Box component="img" src={logo} />
      </Box>
      <ThemeProvider theme={theme}>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap="10px"
          sx={{
            '& .MuiInputBase-colorPrimary': { background: 'white' },
            ...matches ? boxAttr.form.matches : boxAttr.form.notMatches,
          }}
          >
          <TextField
            variant="outlined"
            size="small"
            placeholder="email"
            value=""
          />
          <TextField 
            variant="outlined"
            size="small"
            placeholder="password"
            value=""
          />
          <Button 
            variant="contained" 
            size="small"
            color="primary"
            onClick={routeChange}
          >
            Log in
          </Button>
        </Box>
      </ThemeProvider>
    </Box>    
  );
}
  
export default Home;