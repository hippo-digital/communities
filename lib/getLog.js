import simpleGit from "simple-git";

let git;

export default async function getLog(file, eleventyConfig) {
  const {
    dir: { input },
  } = eleventyConfig;
  git = git || simpleGit({ baseDir: input });
  const log = await git.log({ file });
  return log.latest;
}
