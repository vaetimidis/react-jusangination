import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/404';
import { Game } from './components/Game/Game';
import { TodoList } from './components/TodoList/TodoList';
import { Layout } from './components/layouts/Layout';
import React from 'react';

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
