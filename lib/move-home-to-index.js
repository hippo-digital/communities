const { access, rename, rmdir } = require("node:fs/promises");
const { join } = require("node:path");

// GitHub Wiki uses /Home as the index, move it to the root.
module.exports = async function moveHomeToIndex(eleventyConfig) {
  const {
    dir: { output },
  } = eleventyConfig;

  const sourceDirectory = join(output, "Home");
  const sourcePath = join(sourceDirectory, "index.html");
  const targetPath = join(output, "index.html");
  try {
    await access(sourcePath);
    await rename(sourcePath, targetPath);
    await rmdir(sourceDirectory);
    console.log(`Moving ${sourcePath} to ${targetPath}`);
  } catch (error) {
    throw error;
  }
};
