// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    assetsDir: "",
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
    strictPort: true,
    proxy: {
      "/api": `http://localhost:${process.env.PORT}`,
      "/auth": `http://localhost:${process.env.PORT}`,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/client": path.resolve(__dirname, "./src/client"),
      "@/server": path.resolve(__dirname, "./src/server"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
