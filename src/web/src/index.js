import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import theme from './theme';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const router = createBrowserRouter(routes);

root.render(
  <StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
