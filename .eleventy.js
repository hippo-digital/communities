const fs = require("node:fs/promises");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const WebC = require("@11ty/eleventy-plugin-webc");
const markdown = require("./lib/markdown.js");

const { PRODUCTION, GITHUB_REPOSITORY_NAME } = require("./lib/constants.js");

// GitHub Wiki uses /Home as the index, move it to the root.
async function moveHomeToIndex() {
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

  eleventyConfig.addPlugin(WebC);
  const baseHref = PRODUCTION ? `/${GITHUB_REPOSITORY_NAME}/` : "/";
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref,
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

  return {
    dir: {
      includes: "../_includes",
      input: "_wiki",
    },
    templateFormats: ["html", "md"],
    htmlTemplateEngine: "webc",
  };
};
