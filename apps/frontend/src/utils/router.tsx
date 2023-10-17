import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '#/pages/404/404';
import { TodoList } from '#/pages/TodoList/TodoList';

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
