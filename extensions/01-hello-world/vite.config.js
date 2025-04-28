import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
    if (mode === 'extension-only') {
        return {
            build: {
                outDir: 'dist',
                lib: {
                    entry: './src/extension.js',
                    formats: ['es']
                },
                rollupOptions: {
                    // Make sure to preserve exports from entry points
                    preserveEntrySignatures: 'strict',
                    output: {
                        // Disable code splitting by ensuring each entry point gets its own file
                        preserveModules: false,
                        // Don't use hash in filenames
                        entryFileNames: `[name].dist.js`,
                        // Prevent any chunks from being created
                        inlineDynamicImports: true,
                    }
                },
                // Disable minification for easier debugging
                minify: false,
            },
        };
    }

    return {
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
    };
});
