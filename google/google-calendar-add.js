const URL = `https://calendar.google.com/calendar/u/0/r/eventedit`;

const run = async (_, { shell }) => await shell.openExternal(URL);

module.exports = { run, actions: [] };
