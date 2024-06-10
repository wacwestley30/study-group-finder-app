import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bulma/css/bulma.min.css';

import App from './App.jsx';
import Home from './pages/home.jsx';
import GroupPage from './pages/GroupPage';
import GroupDetails from './pages/GroupDetails';
import ProfilePage from './pages/ProfilePage'; // Import ProfilePage

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
        path: '/groups',
        element: <GroupPage />,
      },
      {
        path: '/group/:groupId',
        element: <GroupDetails />,
      },
      {
        path: '/profile/:username', // Profile route
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