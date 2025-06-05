import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["**/node_modules/**", "**/dist/**", "**/e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.spec.ts", "src/**/*.test.ts"],
    },
  },
});
