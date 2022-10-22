const requireModule = require("../require-module.js");
const { GITHUB_REPOSITORY } = require("../constants.js");

module.exports = async function (markdown, pageData, eleventyConfig) {
  const { unified } = await import("unified");

  const output = await unified()
    // Turn Markdown text into Markdown syntax tree
    .use(await requireModule("remark-parse"))
    // Apply Markdown specific transforms
    .use(await requireModule("remark-directive"))
    .use(await requireModule("remark-breaks"))
    .use(await requireModule("remark-emoji"))
    .use(await requireModule("remark-footnotes"))
    .use(await requireModule("remark-gfm"))
    .use(await requireModule("remark-github"), {
      repository: GITHUB_REPOSITORY,
    })
    .use(await requireModule("./include-partial.mjs"), {
      pageData,
      eleventyConfig,
    })
    .use(await requireModule("./relative-links.mjs"))
    .use(await requireModule("./responsive-tables.mjs"))
    .use(await requireModule("remark-slug"))
    .use(await requireModule("remark-smartypants"))
    // Turn Markdown into HTML syntax tree
    .use(await requireModule("remark-rehype"), {
      fragment: true,
    })
    // Apply HTML specific transforms
    .use(await requireModule("rehype-format"), { indent: "\t" })
    // Turn HTML syntax tree into HTML text
    .use(await requireModule("rehype-stringify"))
    .process(markdown);

  return String(output);
};
