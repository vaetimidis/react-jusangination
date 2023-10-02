import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/404.tsx';
import { Game } from './components/Game/Game.tsx';
import { TodoList } from './components/TodoList/TodoList.tsx';
import { Layout } from './components/layouts/Layout.tsx';

const router = createBrowserRouter([
    {
        path: '/game',
        element: <Game />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/tasks',
        element: <TodoList />,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Layout>
        <RouterProvider router={router} />
    </Layout>
);
