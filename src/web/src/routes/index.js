import React from 'react';
import Home from '../pages/Home';
import { Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import DefaultLayout from '../layouts/DefaultLayout';
import CreateEvents from '../pages/CreateEvents';
import ViewEvents from '../pages/ViewEvents';

const routes = [
  { path: '/', element: <DefaultLayout component={<Home />} /> },
  {
    path: 'admin/register',
    element: <DefaultLayout component={<Register />} />,
  },
  {
    path: 'user/register',
    element: <DefaultLayout component={<Register />} />,
  },
  {
    path: 'admin/event/create',
    element: <DefaultLayout component={<CreateEvents />} />,
  },
  {
    path: 'events',
    element: <DefaultLayout component={<ViewEvents />} />,
  },

  //Catch all
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default routes;
