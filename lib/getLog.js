const simpleGit = require("simple-git");

let git;

module.exports = async function getLog(file, eleventyConfig) {
  const {
    dir: { input },
  } = eleventyConfig;
  git = git || simpleGit({ baseDir: input });
  const log = await git.log({ file });
  return log.latest;
};
