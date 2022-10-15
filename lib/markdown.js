const path = require("node:path");
const unified = require("unified");
const parse = require("remark-parse");
const slug = require("remark-slug");
const github = require("remark-gfm");
const githubReferences = require("remark-github");
const breaks = require("remark-breaks");
const emoji = require("remark-emoji");
const footnotes = require("remark-footnotes");
const rehype = require("remark-rehype");
const format = require("rehype-format");
const stringify = require("rehype-stringify");
const visit = require("unist-util-visit");

const { GITHUB_REPOSITORY, BASE_HREF, DEPLOYED } = require("./constants.js");

function relativeLinks() {
  function visitor(node) {
    if (typeof node.url !== "string") {
      return;
    }
    const isRelative = node.url.startsWith("./");
    if (!isRelative) {
      return;
    }
    node.url = path.resolve(DEPLOYED ? "/" : BASE_HREF, node.url);
  }

  function transform(tree) {
    visit(tree, ["link", "linkReference"], visitor);
  }

  return transform;
}

module.exports = async function (markdown) {
  const output = await unified()
    // Turn Markdown text into Markdown syntax tree
    .use(parse)
    // Apply Markdown specific transforms
    .use(relativeLinks)
    .use(slug)
    .use(github)
    .use(githubReferences, {
      repository: GITHUB_REPOSITORY,
    })
    .use(breaks)
    .use(emoji)
    .use(footnotes)
    // Turn Markdown into HTML syntax tree
    .use(rehype)
    // Apply HTML specific transforms
    .use(format, { indent: "\t" })
    // Turn HTML syntax tree into HTML text
    .use(stringify)
    .process(markdown);

  return String(output);
};
