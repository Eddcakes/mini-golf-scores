import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA({
      registerType: "prompt",
      manifest: {
        name: "mini-golf-scores",
        short_name: "puttn",
        description:
          "Record your mini golf scores and visualise your games in a chart.",
        theme_color: "#CB4831",
        background_color: "#F7F8FA",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "favicon",
          },
          {
            src: "images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "public/images/screenshots/desktop-small.png",
            sizes: "1002x741",
            type: "image/png",
            form_factor: "wide",
            label: "Mini golf scores interactive chart (desktop)",
          },
          {
            src: "public/images/screenshots/mobile-s8.png",
            sizes: "361x740",
            type: "image/png",
            form_factor: "narrow",
            label: "Create a new game (mobile)",
          },
        ],
        //  workbox: {
        //    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        //  },
      },
      devOptions: {
        enabled: true,
      },
    }),
    mkcert(),
  ],
  server: {
    https: true,
  },
});
