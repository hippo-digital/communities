const {
  EleventyHtmlBasePlugin,
  EleventyRenderPlugin,
} = require("@11ty/eleventy");
const EleventyPluginUnified = require("eleventy-plugin-unified");

const DefaultFrontmatterPlugin = require("./lib/plugins/default-frontmatter.cjs");

const {
  capitalise,
  deslug,
  fileExists,
  filterBy,
  formatDate,
  gitLog,
  textLength,
  print,
} = require("./lib/filters.cjs");

const constants = require("./lib/constants.cjs");
const { BASE_HREF, GITHUB_REPOSITORY, GITHUB_REPOSITORY_NAME } = constants;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: BASE_HREF,
  });
  eleventyConfig.addPlugin(EleventyPluginUnified, {
    transformsDirectory: "./lib/markdown/",
    markdownTransforms: [
      "plugins/external-links.js",
      "plugins/relative-links.js",
      "plugins/responsive-tables.js",
      "plugins/aria-current-links.js",
      "directives/include-partial.js",
      "remark-breaks",
      "remark-emoji",
      "remark-footnotes",
      "remark-gfm",
      ["remark-github", { repository: GITHUB_REPOSITORY }],
      "remark-directive",
      "remark-slug",
      "remark-smartypants",
      [
        "remark-wiki-link",
        {
          pageResolver: (name) => [name.replace(/ /g, "-")],
          hrefTemplate: (path) => `/${path}`,
        },
      ],
    ],
    htmlTransforms: [["rehype-format", { indent: "\t" }]],
  });

  eleventyConfig.addPlugin(DefaultFrontmatterPlugin, {
    all: {
      constants,
      layout: "page.njk",
      websiteDescription: "A website generated from a GitHub wiki",
      websiteTitle: deslug(GITHUB_REPOSITORY_NAME),
    },
    "Home.md": {
      layout: "layout",
      permalink: "/",
    },
  });

  // Use HTML comments to define frontmatter to keep wiki content cleaner.
  eleventyConfig.setFrontMatterParsingOptions({
    delims: ["<!---", "--->"],
  });

  // Filters
  eleventyConfig.addFilter("capitalise", capitalise);
  eleventyConfig.addFilter("deslug", deslug);
  eleventyConfig.addFilter("fileExists", fileExists);
  eleventyConfig.addFilter("formatDate", formatDate);
  eleventyConfig.addFilter("gitLog", gitLog);
  eleventyConfig.addFilter("filterBy", filterBy);
  eleventyConfig.addFilter("textLength", textLength);
  eleventyConfig.addFilter("print", print);

  // Ensure our untracked _wiki input can be used as an input.
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      includes: "../_includes",
      input: "_wiki",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
