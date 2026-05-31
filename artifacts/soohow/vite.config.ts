import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { telegramApiDevPlugin } from "./vite-plugin-telegram-api";

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
const isProduction = process.env.NODE_ENV === "production";
const telegramApiPath = `${apiProxyPrefix}/telegram`.replace(/\/+/g, "/");

export default defineConfig(async ({ mode }) => {
  const appRoot = path.resolve(import.meta.dirname);
  const workspaceRoot = path.resolve(appRoot, "../..");
  Object.assign(process.env, loadEnv(mode, appRoot, ""));
  Object.assign(process.env, loadEnv(mode, workspaceRoot, ""));

  return {
  base: basePath,
  plugins: [
    ...(!isProduction ? [telegramApiDevPlugin(telegramApiPath)] : []),
    react(),
    tailwindcss(),
    ...(!isProduction ? [runtimeErrorOverlay()] : []),
    ...(!isProduction && process.env.REPL_ID !== undefined
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
  publicDir: "public",
  esbuild: {
    sourcemap: false,
    legalComments: "none",
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "SOURCEMAP_ERROR") return;
        warn(warning);
      },
    },
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
        bypass(req) {
          const url = req.url?.split("?")[0] ?? "";
          if (url === telegramApiPath || url === `${telegramApiPath}/`) {
            return url;
          }
        },
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
        bypass(req) {
          const url = req.url?.split("?")[0] ?? "";
          if (url === telegramApiPath || url === `${telegramApiPath}/`) {
            return url;
          }
        },
      },
    },
  },
};
});
