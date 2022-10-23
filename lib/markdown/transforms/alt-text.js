import { fromHtml } from "hast-util-from-html";
import { visitAsync, replaceNode } from "../utils.js";

import { constructRenderPartial } from "../../eleventy-utils.js";

export default function altText() {
  const { eleventyConfig } = this.data();
  const renderPartial = constructRenderPartial(eleventyConfig);

  return (tree) => {
    return visitAsync(tree, ["image"], async (node) => {
      // Show an error if the user has not made a decision.
      const { url, alt } = node;
      if (alt === "") {
        try {
          const html = await renderPartial("_error-message.html", {
            title: "Image has no alternative text",
            error: `
            If the image has meaningful information, describe it, for example:
            <br><code>![join on 1st October at 2pm](https://example.com/poster.png)</code>.
            <br><br>
            If the image is for decoration only, use a three dots (<code>...</code>), for example:
            <br><code>![...](https://example.com/bunting.png)</code>.
            `,
            code: `![](${url})`,
          });
          replaceNode(node, fromHtml(html, { fragment: true }));
        } catch (error) {
          console.error(error);
        }
        return node;
      }

      // If they've made a choice to intentionally have a blank node.alt text
      // trim to make presenational.
      if (alt.trim() === "...") {
        node.alt = "";
        return;
      }
    });
  };
}
