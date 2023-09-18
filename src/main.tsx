import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './routes/404.tsx';

const router = createBrowserRouter([
    {
        path: '/game',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/',
        element: <div>ggd</div>,
        errorElement: <ErrorPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
