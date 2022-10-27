import { fromHtml } from "hast-util-from-html";

import { constructRenderPartial } from "./utils.js";
import { visitAsync, replaceNode } from "../utils.js";

// ::include[_partial.html] => <h1>Hello, World</h1>
export default function includePartialDirective() {
  const { context, eleventyConfig } = this.data();
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
        html = await renderPartial(fileName, context);
      } catch (error) {
        // If it fails render an error message into the page instead.
        html = await renderPartial("_error-message.njk", {
          title: "Could not include partial",
          error,
          code: `::include[${fileName}]`,
        });
      }
      replaceNode(node, fromHtml(html, { fragment: true }));
    });
  };
}
