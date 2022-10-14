const fs = require("node:fs/promises");
const markdown = require("./lib/markdown.js");

const { GITHUB_REPOSITORY_NAME } = require("./lib/constants.js");

// GitHub Wiki uses /Home as the index, move it to the root.
async function moveHomeToIndex () {
    const sourcePath = `_site/Home/index.html`;
    const targetPath = `_site/index.html`;
    console.log(`Moving ${sourcePath} to ${targetPath}`)
    try  {
        await fs.access(sourcePath);
        await fs.rename(sourcePath, targetPath);
        await fs.rmdir("_site/Home/");
    } catch (error) {
        console.log(error);
    }
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", {
    render: (content) => markdown(content),
  });

  // After files are built
  eleventyConfig.on("eleventy.after", moveHomeToIndex);

  return {
    dir: {
      input: "_wiki",
      pathPrefix: `/${GITHUB_REPOSITORY_NAME}/`,
    },
  };
};
