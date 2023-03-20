const { getRepoName } = require("./git.cjs");

const { CI } = process.env;

const GITHUB_REPOSITORY = getRepoName();

const DEPLOYED = !!CI;

const [GITHUB_REPOSITORY_OWNER, GITHUB_REPOSITORY_NAME] = GITHUB_REPOSITORY
  ? GITHUB_REPOSITORY.split("/")
  : "";

const BASE_HREF = "/";
const WEBSITE_URL = "https://communities.hippodigital.co.uk";

module.exports = {
  WEBSITE_URL,
  BASE_HREF,
  DEPLOYED,
  GITHUB_REPOSITORY,
  GITHUB_REPOSITORY_OWNER,
  GITHUB_REPOSITORY_NAME,
};
