import './assets/scss/global.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { TodoList } from './components/TodoList/TodoList';
import { DefaultLayout } from './components/layouts/DefaultLayout';
import { ThemeProvider } from './contexts/theme';
import ErrorPage from './routes/404';

enum AppRoutes {
  HOME = '/',
  TASKS = '/tasks'
}

const router = createBrowserRouter([
  {
    path: AppRoutes.HOME,
    element: <div>ggd</div>,
    errorElement: <ErrorPage />
  },
  {
    path: AppRoutes.TASKS,
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
