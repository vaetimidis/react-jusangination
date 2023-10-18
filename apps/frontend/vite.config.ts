import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { type UserConfig, defineConfig } from 'vite';

export default defineConfig(async (): Promise<UserConfig> => {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '#': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx']
    }
  };

  return config;
});
