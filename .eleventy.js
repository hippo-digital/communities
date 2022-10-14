// Environment variable in GitHub actions deployment.
const { GITHUB_REPOSITORY } = process.env;

module.exports = function (eleventyConfig) {
    const pathPrefix = GITHUB_REPOSITORY ? `/${GITHUB_REPOSITORY.split("/")[1]}/` : "/";
  return {
    dir: {
      input: "_wiki",
      pathPrefix,
    },
  };
};
