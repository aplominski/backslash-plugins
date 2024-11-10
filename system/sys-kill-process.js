const run = async (query, { exec, path }) => {
  const stdout = async () => {
    return new Promise((resolve, reject) => {
      exec("ps aux", (error, stdout, stderr) => {
        if (error) return reject(`Error: ${stderr}`);
        resolve(stdout);
      });
    });
  };

  const processesList = await stdout();

  const processes = processesList
    .split("\n")
    .slice(1)
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s+/);
      const user = parts[0];
      const pid = parts[1];
      const cpuUsage = parseFloat(parts[2]);
      const rssMemoryKB = parseInt(parts[5], 10);
      const commandWithArgs = parts.slice(10).join(" ");
      const commandName = path.basename(commandWithArgs.split(" ")[0]);
      const memUsageMB = (rssMemoryKB / 1024).toFixed(1);

      return {
        data: {
          id: pid,
          user,
          pid,
          cpuUsage,
          memUsage: memUsageMB,
          command: commandName,
          fullCommand: commandWithArgs,
        },

        content: [
          {
            type: "div",
            className: "flex items-center w-full",
            children: [
              {
                type: "title",
                content: commandName,
                className: "flex-1",
              },
              {
                type: "div",
                className: "flex items-center gap-4",
                children: [
                  {
                    type: "div",
                    className: "flex items-center gap-2",
                    children: [
                      {
                        type: "icon",
                        className: "ph ph-identification-badge text-lg",
                      },
                      {
                        type: "p",
                        content: pid,
                        className: "flex-1",
                      },
                    ],
                  },
                  {
                    type: "div",
                    className: "flex items-center gap-2",
                    children: [
                      {
                        type: "icon",
                        className: "ph ph-cpu text-lg",
                      },
                      {
                        type: "p",
                        content: `${cpuUsage}%`,
                        className: "flex-1",
                      },
                    ],
                  },
                  {
                    type: "div",
                    className: "flex items-center gap-2",
                    children: [
                      {
                        type: "icon",
                        className: "ph ph-memory text-lg",
                      },
                      {
                        type: "p",
                        content: `${memUsageMB} MB`,
                        className: "flex-1",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      };
    })
    .sort((a, b) => {
      const totalA = a.data.cpuUsage + parseFloat(a.data.memUsage);
      const totalB = b.data.cpuUsage + parseFloat(b.data.memUsage);
      return totalB - totalA;
    })
    .slice(0, 10);

  const filteredProcesses = query
    ? processes.filter((process) =>
        process.data.command.toLowerCase().includes(query.toLowerCase())
      )
    : processes;

  return filteredProcesses;
};

const killProcess = async (data, { exec }) => {
  return new Promise((resolve, reject) => {
    exec(`kill ${data.pid}`, (error, stdout, stderr) => {
      if (error) return reject(`Error: ${stderr}`);
      resolve(stdout);
    });
  });
};

module.exports = {
  run,
  actions: [{ name: "Kill process", action: killProcess }],
};
