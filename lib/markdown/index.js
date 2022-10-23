import { unified } from "unified";
import parse from "remark-parse";
import directive from "remark-directive";
import breaks from "remark-breaks";
import emoji from "remark-emoji";
import footnotes from "remark-footnotes";
import gfm from "remark-gfm";
import github from "remark-github";
import slug from "remark-slug";
import smartypants from "remark-smartypants";
import rehype from "remark-rehype";
import format from "rehype-format";
import stringify from "rehype-stringify";

import includePartialDirective from "./directives/include-partial.js";
import altText from "./transforms/alt-text.js";
import externalLinks from "./transforms/external-links.js";
import relativeLinks from "./transforms/relative-links.js";
import responsiveTables from "./transforms/responsive-tables.js";

export default async function (markdown, pageData, eleventyConfig) {
  const output = await unified()
    // Turn Markdown text into Markdown syntax tree
    .use(parse)
    // Apply internal directives
    .use(directive)
    .use(includePartialDirective)
    // Apply internal Markdown transforms
    .use(altText)
    .use(externalLinks)
    .use(relativeLinks)
    .use(responsiveTables)
    // Apply external Markdown transforms
    .use(breaks)
    .use(emoji)
    .use(footnotes)
    .use(gfm)
    .use(github)
    .use(slug)
    .use(smartypants)
    // Turn Markdown into HTML syntax tree
    .use(rehype, {
      fragment: true,
    })
    // Apply HTML specific transforms
    .use(format, { indent: "\t" })
    // Turn HTML syntax tree into HTML text
    .use(stringify)
    .data({
      pageData,
      eleventyConfig
    })
    .process(markdown);

  return String(output);
}
