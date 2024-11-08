const URL = `https://calendar.google.com/calendar/`;

const run = async (_, { shell }) => await shell.openExternal(URL);

module.exports = { run, actions: [] };
