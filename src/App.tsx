import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';

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
    <RouterProvider router={router} />
  );
}

export default App;
