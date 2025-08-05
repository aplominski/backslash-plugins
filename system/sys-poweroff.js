const run = async (_, { exec }) => {
    await exec("systemctl poweroff");
  };
  
  module.exports = { run, actions: [] };
  