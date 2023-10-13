import { RouterProvider } from 'react-router-dom';

import { DefaultLayout } from '#/components/layouts/DefaultLayout';
import { ThemeProvider } from '#/contexts/theme';
import router from '#/utils/router';

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
