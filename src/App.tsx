import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';
import { Box } from '@mui/material';

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
      <RouterProvider router={router} />

    </Box>
  );
}

export default App;
