const markdown = require("./lib/markdown.js");

const { GITHUB_REPOSITORY_NAME } = require("./lib/constants.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", {
    render: (content) => markdown(content),
  });
  const pathPrefix = GITHUB_REPOSITORY_NAME
    ? `/${GITHUB_REPOSITORY_NAME}/`
    : "/";
  return {
    dir: {
      input: "_wiki",
      pathPrefix,
    },
  };
};
