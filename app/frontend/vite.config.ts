import { resolve } from "path";
import {
  defineConfig,
  UserConfig,
} from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/

console.log("PROXY TARGET:", process.env.VITE_PROXY_API_URL);
let port = 3000;
if (process.env.VITE_PORT) {
  const configuredPort = parseInt(process.env.VITE_PORT, 10);
  if (!isNaN(configuredPort)) {
    port = configuredPort;
  }
}

const ReactCompilerConfig = {};

const plugins: UserConfig["plugins"] = [react({
  babel: {
    plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
  },
}), svgr()];

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  cacheDir: process.env.VITE_CACHE_DIR ?? undefined,
  clearScreen: false,
  plugins,
  preview: {
    port: 5000,
  },
  server: {
    hmr: {
      host: "localhost",
    },
    host: process.env.VITE_HOST ?? "0.0.0.0",
    open: false,
    port,
    proxy: {
      "/api": {
        changeOrigin: true,
        secure: false,
        target: process.env.VITE_PROXY_API_URL,
        ws: true,
      },
    },
  },
});
