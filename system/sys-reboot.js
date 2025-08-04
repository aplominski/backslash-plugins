const run = async (_, { exec }) => {
    await exec("systemctl reboot");
  };
  
  module.exports = { run, actions: [] };
  