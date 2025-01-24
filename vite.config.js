// vite.config.js
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://setelip.com.br/shop-stock-jumap/",
        changeOrigin: true,
      },
    },
  },
})
