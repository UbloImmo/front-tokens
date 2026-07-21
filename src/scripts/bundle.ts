import path from "node:path";

import { $ } from "bun";
import dedent from "ts-dedent";
import { Logger } from "@ubloimmo/front-util";

const INDEX_DTS_CONTENT = dedent`
  export * from "./icons.d";
  export * from "./tokens.all.d";
  export * from "./tokens.collection.d";
  export * from "./tokens.values.d";
`;

const INDEX_DTS_PATH = path.resolve(
  process.cwd(),
  "dist",
  "types",
  "index.d.ts"
);

const logger = Logger();

export async function bundle() {
  logger.info("Bundling token files & generating d.ts using vite...", "Bundle");
  // run vite build
  await $`vite build --config vite.config.ts`;

  logger.info("Overwriting index.d.ts...", "Bundle");
  // overwrite index.d.ts with imports from other files
  await Bun.write(INDEX_DTS_PATH, INDEX_DTS_CONTENT);
  logger.info("Done!", "Bundle");
}
