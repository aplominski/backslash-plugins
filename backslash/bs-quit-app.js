const run = async (_, { app }) => {
  app.isQuitting = true;
  await app.quit();
};

module.exports = { run, actions: [] };
