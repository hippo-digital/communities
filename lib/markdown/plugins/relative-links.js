import { resolve, join } from "node:path";
import { BASE_HREF } from "../../constants.cjs";
import { visit } from "unist-util-visit";

// [./link-path] => [/link-path]
export default function relativeLinks() {
  return (tree) => {
    visit(tree, ["link", "linkReference"], (node) => {
      if (typeof node.url !== "string") {
        return;
      }
      const isRelative = node.url.startsWith("./");
      if (!isRelative) {
        return;
      }
      // Add trailing slash to avoid unnecessary redirects.
      node.url = join(resolve(BASE_HREF, node.url), "/");
    });
  };
}
