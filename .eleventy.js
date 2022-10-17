const fs = require("node:fs/promises");
const path = require("node:path");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { format } = require("date-fns");

const getLog = require("./lib/getLog.js");
const markdown = require("./lib/markdown.js");
const constants = require("./lib/constants.js");
const { INPUT, BASE_HREF } = constants;

// GitHub Wiki uses /Home as the index, move it to the root.
async function moveHomeToIndex(source, target) {
  const sourcePath = `_site/Home/index.html`;
  const targetPath = `_site/index.html`;
  console.log(`Moving ${sourcePath} to ${targetPath}`);
  try {
    await fs.access(sourcePath);
    await fs.rename(sourcePath, targetPath);
    await fs.rmdir("_site/Home/");
  } catch (error) {
    throw error;
  }
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: BASE_HREF,
  });

  eleventyConfig.setLibrary("md", {
    disable: () => {}, // TODO: Fix upstream so dont need to do this.
    render: (content) => markdown(content),
  });

  eleventyConfig.setFrontMatterParsingOptions({
    delims: ["<!---", "--->"],
  });

  // After files are built
  eleventyConfig.on("eleventy.after", moveHomeToIndex);

  // Global variables
  eleventyConfig.addGlobalData("constants", constants);
  // Set default layout
  eleventyConfig.addGlobalData("layout", "page.html");

  // Filters
  eleventyConfig.addFilter("textLength", (htmlContent) => {
    const textContent = htmlContent.replace(/(<([^>]+)>)/gi, "");
    const trimmedContent = textContent.replace(/\s/g, "").trim();
    return trimmedContent.length;
  });
  eleventyConfig.addFilter("formatDate", (timestamp) => {
    const date = new Date(timestamp);
    return `${format(date, "do MMMM yyyy")} at ${format(date, "h:mmaaa")}`;
  });
  eleventyConfig.addFilter("getLog", async (inputPath) => {
    return await getLog(path.basename(inputPath));
  });

  return {
    dir: {
      data: "../_data",
      includes: "../_includes",
      input: INPUT,
    },
    templateFormats: ["html", "md"],
    htmlTemplateEngine: "njk",
  };
};
