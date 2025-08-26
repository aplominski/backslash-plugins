const run = async (query, { exec, path }) => {
  const dockerPs = async () => {
    return new Promise((resolve, reject) => {
      exec("docker ps -a --format '{{json .}}'", (error, stdout, stderr) => {
        if (error) return reject(`Error: ${stderr}`);
        resolve(stdout.trim().split("\n").map(line => JSON.parse(line)));
      });
    });
  };

  const containers = await dockerPs();

  const items = containers.map(c => {
    return {
      data: {
        id: c.ID,
        name: c.Names,
        image: c.Image,
        status: c.Status,
      },
      content: [
        {
          type: "div",
          className: "flex items-center w-full",
          children: [
            {
              type: "title",
              content: c.Names,
              className: "flex-1",
            },
            {
              type: "p",
              content: c.Image,
              className: "text-sm text-gray-400",
            },
            {
              type: "p",
              content: c.Status,
              className: "ml-auto text-sm",
            },
          ],
        },
      ],
    };
  });

  const filtered = query
    ? items.filter(item =>
        item.data.name.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return filtered;
};

const startContainer = async (data, { exec }) => {
  return new Promise((resolve, reject) => {
    exec(`docker start ${data.id}`, (error, stdout, stderr) => {
      if (error) return reject(`Error: ${stderr}`);
      resolve(stdout);
    });
  });
};

const stopContainer = async (data, { exec }) => {
  return new Promise((resolve, reject) => {
    exec(`docker stop ${data.id}`, (error, stdout, stderr) => {
      if (error) return reject(`Error: ${stderr}`);
      resolve(stdout);
    });
  });
};

const removeContainer = async (data, { exec }) => {
  return new Promise((resolve, reject) => {
    exec(`docker rm ${data.id}`, (error, stdout, stderr) => {
      if (error) return reject(`Error: ${stderr}`);
      resolve(stdout);
    });
  });
};

module.exports = {
  run,
  actions: [
    { name: "Start container", action: startContainer },
    { name: "Stop container", action: stopContainer },
    { name: "Remove container", action: removeContainer },
  ],
};
