import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "MmdGeneralDatePicker",
      fileName: (format) => `mmd-general-date-picker.${format}.js`,
    },
  },
  server: {
    port: 3000,
  },
});
