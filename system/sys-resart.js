const run = async (_, { exec }) => {
    await exec("systemctl restart");
  };
  
  module.exports = { run, actions: [] };
  