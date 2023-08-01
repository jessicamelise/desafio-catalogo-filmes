import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';
import { Box, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#AA2321',
    },
    secondary: {
      main: '#7B8C98',
    },
    action: {
      disabledBackground: 'rgba(170, 35, 33, 0.40)',
    },
  },
  typography: {
    allVariants: {
      color: '#FFFFFF',
    },
    body2: {
      color: '#7B8C98'
    }
  },
});

const App = () => {
  const router = createHashRouter(
    [
      {
        element: <Home />,
        path: '/',
      },
      {
        element: <Films />,
        path: '/films',
      },
      {
        element: <FilmDetail />,
        path: 'films/:filmId',
      },
    ], 
    { basename: "/" }
  );

  return (
    <Box 
      padding="30px 40px"
      width="calc(100% - 80px)"
      height="calc(100% - 60px)" 
      sx={{
        background: '#0B1014',
      }}
    >
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Box>
  );
}

export default App;
