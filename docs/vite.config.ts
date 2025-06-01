import { defineConfig } from "vitepress";

export default defineConfig({
  title: "General Date Picker",
  description: "Cross-framework TypeScript date-picker",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
    ],
    sidebar: {
      "/guide/": [{ text: "Getting Started", link: "/guide/" }],
    },
  },
  vite: {
    server: {
      port: 8080,
    },
  },
});
