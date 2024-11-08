const run = async (_, { exec }) => {
  try {
    await exec('pactl set-sink-volume @DEFAULT_SINK@ 75%', (error, stdout, stderr) => {
      if (error) console.error(`Error setting volume: ${error.message}`);
      if (stderr) console.error(`Error output: ${stderr}`);
    });

    return null;
  } catch (error) {
    return console.log(`Failed to set volume: ${error.message}`);
  }
};

module.exports = { run, actions: [] };
