import { type UserConfig, defineConfig, loadEnv } from 'vite';

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
    process.env = {
        ...process.env,
        ...loadEnv(mode, process.cwd()),
    };

    const config: UserConfig = { define: { 'process.env': {} } };

    return config;
});
