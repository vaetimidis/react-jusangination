import './assets/scss/global.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { TodoList } from './components/TodoList/TodoList';
import { DefaultLayout } from './components/layouts/DefaultLayout';
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
      <DefaultLayout>
        <RouterProvider router={router} />
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;
