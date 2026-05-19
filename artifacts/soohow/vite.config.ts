import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "4173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const normalizedBase =
  basePath === "/" ? "/" : basePath.endsWith("/") ? basePath : `${basePath}/`;
const apiProxyPrefix = `${normalizedBase}api`.replace(/\/+/g, "/");
const apiServerPort = process.env.API_PORT ?? "5000";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.NODE_ENV !== "production" ? [runtimeErrorOverlay()] : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      [apiProxyPrefix]: {
        target: `http://127.0.0.1:${apiServerPort}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(apiProxyPrefix, "/api"),
      },
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      [apiProxyPrefix]: {
        target: `http://127.0.0.1:${apiServerPort}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(apiProxyPrefix, "/api"),
      },
    },
  },
});
