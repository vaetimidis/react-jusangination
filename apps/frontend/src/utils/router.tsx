import { createBrowserRouter } from 'react-router-dom';

import { TodoList } from '#/components/TodoList/TodoList';
import ErrorPage from '#/pages/404';

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

export default router;
