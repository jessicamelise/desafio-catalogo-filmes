import { BrowserRouter, HashRouter, Link, Route, RouterProvider, Routes, createBrowserRouter, createHashRouter } from 'react-router-dom';

// function App() {
//   const router = createBrowserRouter([
//     {
//         element: <Home />,
//         children: [
//             // {
//             //     path: '/home',
//             //     element: <Home />,
//             // },
//             {
//                 path: '/:id',
//                 element: <>detalhes</>,
//             },
//         ],
//     },
// ], { basename: "/desafio-catalogo-filmes" })
  
//   return (
//     // <BrowserRouter>
//     //     <Routes>
//     //       <Route path="*/">
//     //         <Redirect to={<Home />} />
//     //       </Route>
//     //       <Route path="*/home" element={<Home />} />
//     //       <Route path="*/detail/:id" element={<>detalhes</>} />
//     //     </Routes>
//     // </BrowserRouter>
//     <RouterProvider router={router} />
//   );
// }

// export default App;

export default function App() {
  return (
    <BrowserRouter>
      <HashRouter basename="/">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about">
            <>teste sobre</>
          </Route>
          <Route path="/users">
            <>teste usuario</>
          </Route>
          <Route path="/">
            <>teste home</>
          </Route>
        </Routes>
      </HashRouter>
    </BrowserRouter>
  );
}
