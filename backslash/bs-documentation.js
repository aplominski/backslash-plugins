const URL = `https://github.com/backslash-app/backslash/blob/main/DOCUMENTATION.md`;

const run = async (_, { shell }) => await shell.openExternal(URL);

module.exports = { run, actions: [] };
