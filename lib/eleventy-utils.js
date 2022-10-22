import { join } from "node:path";

export function getIncludesDirectory(eleventyConfig) {
  const {
    dir: { input, includes },
  } = eleventyConfig;
  return join(process.cwd(), input, includes);
}

export function constructRenderPartial(eleventyConfig) {
  // Since we're getting the render function from an eleventyConfig
  // we construct the file instead of importing it.
  const renderFile = eleventyConfig?.javascriptFunctions?.renderFile;
  const includesDirectory = getIncludesDirectory(eleventyConfig);
  return (fileName, data) => {
    const filePath = join(includesDirectory, fileName);
    // Clone the data to prevent manipulating
    // any page data and breaking other rendering.
    const clonedData = Object.assign({}, data || {});
    return renderFile(filePath, clonedData);
  };
}
