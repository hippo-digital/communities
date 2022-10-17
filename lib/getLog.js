const simpleGit = require('simple-git');
const { INPUT } = require('./constants.js');

const git = simpleGit({ baseDir: INPUT });

module.exports = async function getLog (file) {
    const log = await git.log({ file });
    console.log({ log })
    return log.latest;
}