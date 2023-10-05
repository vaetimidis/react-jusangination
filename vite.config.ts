import { type UserConfig, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd()),
    };

    const config: UserConfig = { define: { 'process.env': {} }, plugins: [react()] };

    return config;
});
