// Use ES Modules alongside CommonJS
const { join, extname } = require("node:path");

// Hacky way to get where the function is called from, probably a bad idea.
function getCallerFilePath() {
  const stack = new Error().stack.split("\n");
  const line = stack[3];
  return line.slice(line.lastIndexOf("(") + 1, line.lastIndexOf(".js") + 3);
}

module.exports = async function requireModule(name) {
  const importName = extname(name)
    ? join(getCallerFilePath(), "..", name)
    : name;
  return (await import(importName)).default;
};
