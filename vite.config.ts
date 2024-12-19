import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  base: "/iTube/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./iTube"),
    },
  },
});
