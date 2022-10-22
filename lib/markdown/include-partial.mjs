import { fromHtml } from "hast-util-from-html";

import { constructRenderPartial } from "../eleventy-utils.mjs";
import { visitAsync, replaceNode } from "./utils.mjs";

// ::include[_partial.html] => <h1>Hello, World</h1>
export default ({ pageData, eleventyConfig }) => {
  const renderPartial = constructRenderPartial(eleventyConfig);
  return (tree) => {
    return visitAsync(tree, "leafDirective", async (node) => {
      // ::include[] only.
      if (node.name !== "include") {
        return;
      }

      // ::include[_partial.html] => "_partial.html"
      const fileName = node?.children[0]?.value || "";

      let html;
      try {
        html = await renderPartial(fileName, pageData);
      } catch (error) {
        // If it fails render an error message into the page instead.
        html = await renderPartial("_error-message.html", {
          title: "Could not include partial",
          error,
          code: `::include[${fileName}]`,
        });
      }
      replaceNode(node, fromHtml(html, { fragment: true }));
    });
  };
};
