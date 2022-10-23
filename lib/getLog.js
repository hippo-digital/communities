import simpleGit from "simple-git";

let git;

export default async function getLog(file, eleventyConfig) {
  const {
    dir: { input },
  } = eleventyConfig;
  git = git || simpleGit({ baseDir: input });
  const log = await git.log({ file });
  const oldest = log.all[log.total - 1];
  const latest = log.latest;
  return { latest, oldest };
}
