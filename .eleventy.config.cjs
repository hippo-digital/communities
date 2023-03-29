const {
  EleventyHtmlBasePlugin,
  EleventyRenderPlugin,
} = require("@11ty/eleventy");
const EleventyPluginUnified = require("eleventy-plugin-unified");
const EleventyPluginPWA = require("eleventy-plugin-pwa-v2");

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

const generateSocialMediaImage = require("./lib/generate-social-media-image.cjs");

const constants = require("./lib/constants.cjs");
const { BASE_HREF, GITHUB_REPOSITORY } = constants;

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
      websiteTitle: "Hippo Digital Communities",
      websiteDescription: "Join communities at Hippo and meet people like you",
    },
    "Home.md": {
      layout: "home.njk",
      permalink: "/",
    },
  });

  // GitHub pages has a 10 minute cache time so we use Service Workers to provide a longer
  // cache for some assets.
  eleventyConfig.addPlugin(EleventyPluginPWA, {
    // Only cache assets that are unlikely to change often.
    globPatterns: ["assets/**/*"],
    // Previews are only used for social image embedding so dont need caching.
    globIgnores: ["assets/previews/**/*"],
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

  // Shortcodes
  eleventyConfig.addAsyncShortcode("socialMediaPreview", async (community) => {
    return await generateSocialMediaImage({
      slug: community?.page?.fileSlug,
      label: community?.data?.label || deslug(community?.page?.fileSlug),
      image: community?.data?.image,
      backgroundColor: community?.data?.backgroundColor,
      color: community?.data?.color,
    });
  });

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
