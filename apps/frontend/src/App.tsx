// import { Game } from './components/Game/Game';
// eslint-disable-next-line import/order
import React from 'react';

import './assets/scss/global.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { TodoList } from './components/TodoList/TodoList';
import { Layout } from './components/layouts/Layout';
import { ThemeProvider } from './contexts/theme';
import ErrorPage from './routes/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>ggd</div>,
    errorElement: <ErrorPage />
  },
  {
    path: '/tasks',
    element: <TodoList />,
    errorElement: <ErrorPage />
  }
]);

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
