const path = require("node:path");
const {
  EleventyRenderPlugin,
  EleventyHtmlBasePlugin,
} = require("@11ty/eleventy");
const { format } = require("date-fns");

const getLog = require("./lib/getLog.js");
const markdown = require("./lib/markdown/index.js");
const moveHomeToIndex = require("./lib/move-home-to-index.js");
const constants = require("./lib/constants.js");
const { INPUT, BASE_HREF } = constants;
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: BASE_HREF,
  });

  eleventyConfig.setLibrary("md", {
    disable: () => {}, // TODO: Fix upstream so dont need to do this.
    render: (content, data) => markdown(content, data, eleventyConfig),
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
  eleventyConfig.addFilter("slugToTitle", (slug) => {
    return slug.replace(/-/g, " ");
  });
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
  eleventyConfig.addFilter("filterBy", (items, propertyName, value) => {
    return items.find((item) => item[propertyName] === value);
  });

  return {
    dir: {
      includes: "../_includes",
      input: INPUT,
    },
    templateFormats: ["html", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
