import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => ({
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: './index.html',
            output: {
                entryFileNames: 'index.js',
            },
        },
        minify: 'terser',
        sourcemap: mode === 'development',
    },
    server: {
        port: 3000,
        open: true,
    },
}));
