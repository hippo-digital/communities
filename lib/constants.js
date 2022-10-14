const { repository } = require("../package.json");
const url = require("node:url");
const path = require("node:path");

const parsedUrl = url.parse(repository.url).path.substring(1);
const { name: GITHUB_REPOSITORY_NAME, dir: GITHUB_REPOSITORY_OWNER } =
  path.parse(parsedUrl);
const GITHUB_REPOSITORY = path.join(
  GITHUB_REPOSITORY_OWNER,
  GITHUB_REPOSITORY_NAME
);

module.exports = {
  GITHUB_REPOSITORY,
  GITHUB_REPOSITORY_OWNER,
  GITHUB_REPOSITORY_NAME,
};
