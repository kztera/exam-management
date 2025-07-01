// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-ignore
import legacy from "@vitejs/plugin-legacy";
// @ts-ignore  
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";
  const isDevelopment = mode === "development";

  return {
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-transform-react-jsx", { runtime: "automatic" }]
          ]
        }
      }),
      
      legacy({
        targets: ["defaults", "not IE 11"]
      }),
      
      visualizer({
        filename: "dist/stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    
    define: {
      __DEV__: isDevelopment,
      __PROD__: isProduction,
    },
    
    build: {
      outDir: path.resolve(__dirname, "dist"),
      assetsDir: "assets",
      emptyOutDir: true,
      sourcemap: !isProduction,
      target: "es2020",
      minify: isProduction ? "esbuild" : false,
      cssMinify: isProduction,
      
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
            mantine: ["@mantine/core", "@mantine/hooks", "@mantine/form", "@mantine/notifications", "@mantine/dates", "@mantine/dropzone"],
            icons: ["@tabler/icons-react"],
            utils: ["lodash", "await-to-js"]
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      },
      
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096,
      
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true
      }
    },
    
    server: {
      port: 3000,
      open: true,
      strictPort: true,
      hmr: {
        overlay: true,
        port: 24678
      },
      proxy: {
        "/api": {
          target: `http://localhost:${process.env.PORT}`,
          changeOrigin: true,
          secure: false
        },
        "/auth": {
          target: `http://localhost:${process.env.PORT}`,
          changeOrigin: true,
          secure: false
        },
      },
    },
    
    preview: {
      port: 4173,
      open: true
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
      devSourcemap: isDevelopment,
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/client/styles/variables.scss";`
        }
      }
    },
    
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "@mantine/core",
        "@mantine/hooks",
        "@mantine/form",
        "@mantine/notifications",
        "@tabler/icons-react",
        "lodash"
      ],
      exclude: ["@prisma/client"],
      force: isDevelopment
    },
    
    esbuild: {
      target: "es2020",
      drop: isProduction ? ["console", "debugger"] : [],
      pure: isProduction ? ["console.log", "console.warn"] : []
    },
    
    json: {
      namedExports: true,
      stringify: false
    }
  };
});
