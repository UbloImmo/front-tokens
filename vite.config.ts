import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "unplugin-dts/vite";

export default defineConfig({
  plugins: [
    dts({
      include: ["lib"],
      exclude: ["node_modules/**", "src/tests/**", "scripts", "dist", "src"],
      tsconfigPath: "./tsconfig.json",
      bundleTypes: true,
      insertTypesEntry: true,
      copyDtsFiles: true,
      outDirs: "dist/types",
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: {
        index: resolve(__dirname, "lib", "index.ts"),
        icons: resolve(__dirname, "lib", "icons.ts"),
        "tokens.all": resolve(__dirname, "lib", "tokens.all.ts"),
        "tokens.collection": resolve(__dirname, "lib", "tokens.collection.ts"),
        "tokens.values": resolve(__dirname, "lib", "tokens.values.ts"),
      },
      formats: ["es"],
    },
    rolldownOptions: {
      output: {
        dir: "dist",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
