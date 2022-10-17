const simpleGit = require('simple-git');
const { INPUT } = require('./constants.js');

const git = simpleGit({ baseDir: INPUT });

module.exports = async function getLog (file) {
    const log = await git.log({ file });
    return log.latest;
}