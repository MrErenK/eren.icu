import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const interDisplay = await readFile(
  join(process.cwd(), "src/app/fonts/InterDisplay-SemiBold.ttf")
);
