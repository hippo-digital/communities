import { visit } from "unist-util-visit";

export async function visitAsync(tree, matcher, asyncVisitor) {
  const matches = [];
  visit(tree, matcher, (...args) => {
    matches.push(args);
    return tree;
  });

  const promises = matches.map((match) => asyncVisitor(...match));
  await Promise.all(promises);

  return tree;
}

export function replaceNode(node, hast) {
  const topLevelNode = hast && hast.children && hast.children[0];
  if (!topLevelNode) {
    return console.error(
      "No top level node in hast to replace node with",
      hast
    );
  }
  node.type = "parent";
  node.data = node.data || {};
  if (topLevelNode.tagName) {
    node.data.hName = topLevelNode.tagName;
  }
  if (topLevelNode.properties) {
    node.data.hProperties = topLevelNode.properties;
  }
  if (topLevelNode.children) {
    node.data.hChildren = topLevelNode.children;
  }
}
