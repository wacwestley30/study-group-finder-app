import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bulma/css/bulma.min.css';

import App from './App.jsx';
import Home from './pages/home.jsx';
import GroupPage from './pages/GroupPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/group/:groupId',
        element: <GroupPage />,
      },
      {
        path: '/profile/:userId', // Profile route
        element: <ProfilePage />,
      },
      {
        path: '/me', // Personal profile route
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);