import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: "globalThis",
            },
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true,
                }),
            ],
        },
    },
    resolve: {
        alias: {
            assert: "assert",
            stream: "stream-browserify",
            https: "agent-base",
        },
    },
    plugins: [
        laravel({
            input: ["resources/sass/app.scss", "resources/js/app.js"],
            refresh: true,
        }),
        react(),
    ],
});
