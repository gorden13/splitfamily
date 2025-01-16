import {
  Route,
  createRoutesFromElements,
  RouterProvider,
  createHashRouter,
} from 'react-router-dom';

import { HomePage } from 'pages/home';

const routers = createRoutesFromElements(
  <Route path="/" element={<HomePage />} />
);

const router = createHashRouter(routers, {});

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
