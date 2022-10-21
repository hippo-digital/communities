const { join } = require("node:path");
const requireModule = require("../require-module.js");
const { GITHUB_REPOSITORY } = require("../constants.js");

module.exports = async function (markdown) {
  const { unified } = await import("unified");

  const output = await unified()
    // Turn Markdown text into Markdown syntax tree
    .use(await requireModule("remark-parse"))
    // Apply Markdown specific transforms
    .use(await requireModule("remark-breaks"))
    .use(await requireModule("remark-emoji"))
    .use(await requireModule("remark-footnotes"))
    .use(await requireModule("remark-gfm"))
    .use(await requireModule("remark-github"), {
      repository: GITHUB_REPOSITORY,
    })
    .use(await requireModule(join(__dirname, "relative-links.mjs")))
    .use(await requireModule(join(__dirname, "responsive-tables.mjs")))
    .use(await requireModule("remark-slug"))
    .use(await requireModule("remark-smartypants"))
    // Turn Markdown into HTML syntax tree
    .use(await requireModule("remark-rehype"))
    // Apply HTML specific transforms
    .use(await requireModule("rehype-format"), { indent: "\t" })
    // Turn HTML syntax tree into HTML text
    .use(await requireModule("rehype-stringify"))
    .process(markdown);

  return String(output);
};
