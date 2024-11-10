const run = async (_, { exec }) => {
  await exec("pactl set-sink-volume @DEFAULT_SINK@ 25%");
};

module.exports = { run, actions: [] };
