import { join } from "node:path";
import { access } from "node:fs/promises";
import { getHelpers, getIncludesDirectory } from "./utils.js";

// Since we're getting the render function from an eleventyConfig
// we construct the file instead of importing it.
export default function constructRenderPartial(eleventyConfig) {
  const includesDirectory = getIncludesDirectory(eleventyConfig);
  const { renderFile } = getHelpers(eleventyConfig);
  return async (fileName, context) => {
    if (fileName.trim() === "") {
      throw new Error(`partial file name is empty`);
    }
    if (!fileName.startsWith("_")) {
      throw new Error(
        `partial "${fileName}" does not begin with an underscore (_)`
      );
    }
    const filePath = join(includesDirectory, fileName);
    try {
      await access(filePath);
    } catch (error) {
      throw new Error(
        `partial "${fileName}" does not exist in "${includesDirectory}"`
      );
    }
    // Clone the context to prevent manipulating
    // any page context and breaking other rendering.
    const clonedContext = Object.assign({}, context || {});
    return renderFile(filePath, clonedContext);
  };
}
