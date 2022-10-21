// Use ES Modules alongside CommonJS
module.exports = async function requireModule(name) {
  return (await import(name)).default;
};
