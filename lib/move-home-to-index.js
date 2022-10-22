import { access, rename, rmdir } from "node:fs/promises";
import { join } from "node:path";

// GitHub Wiki uses /Home as the index, move it to the root.
export default async function moveHomeToIndex(eleventyConfig) {
  const {
    dir: { output },
  } = eleventyConfig;

  const sourceDirectory = join(output, "Home");
  const sourcePath = join(sourceDirectory, "index.html");
  const targetPath = join(output, "index.html");
  await access(sourcePath);
  await rename(sourcePath, targetPath);
  await rmdir(sourceDirectory);
  console.log(`Moving ${sourcePath} to ${targetPath}`);
}
