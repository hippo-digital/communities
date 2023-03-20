import { resolve } from "node:path";
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
      node.url = resolve(BASE_HREF, node.url);
    });
  };
}
