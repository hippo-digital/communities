import { extname, join } from "node:path";
import { access } from "node:fs/promises";
import { getHelpers, getIncludesDirectory } from "./utils.js";

const getDefaultFileExtension = (context) => {
  const defaultTemplateSyntax = context?.page?.templateSyntax || "";
  const htmlTemplateEngine = defaultTemplateSyntax.split(",")[0];
  return htmlTemplateEngine ? "." + htmlTemplateEngine : "";
};

// Since we're getting the render function from an eleventyConfig
// we construct the file instead of importing it.
export default function constructRenderPartial(eleventyConfig) {
  const includesDirectory = getIncludesDirectory(eleventyConfig);
  const { renderFile } = getHelpers(eleventyConfig);
  return async (fileName, context) => {
    // ::include[]
    if (fileName.trim() === "") {
      throw new Error(`partial file name is empty`);
    }

    // ::include[partial.njk] => ::include[_partial.njk]
    if (!fileName.startsWith("_")) {
      fileName = "_" + fileName;
    }

    // ::include[_partial] => ::include[_partial.njk]
    const defaultFileExtension = getDefaultFileExtension(context);
    const fileExtension = extname(fileName);
    fileName = fileExtension ? fileName : fileName + defaultFileExtension;

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
