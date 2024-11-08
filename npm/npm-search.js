const run = async (query, { axios }) => {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`
    );

    if (response.data && response.data.objects && response.data.objects.length > 0) {
      return response.data.objects.map((obj) => ({
        data: {
          id: obj.package.name,
          name: obj.package.name,
          version: obj.package.version,
          link: `https://www.npmjs.com/package/${obj.package.name}`,
        },
        content: [
          {
            type: 'div',
            className: 'flex items-center w-full gap-2',
            children: [
              {
                type: 'title',
                content: obj.package.name,
                className: ''
              },
              {
                type: 'p',
                content: obj.package.description,
                className: 'flex-1'
              },
              {
                type: 'badge',
                content: `v${obj.package.version}`,
                className: ''
              }
            ]
          }
        ]
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

const openNpmPackage = async (package, { shell }) => {
  shell.openExternal(`https://www.npmjs.com/package/${package.name}`);
};

const openBundlephobia = async (package, { shell }) => {
  shell.openExternal(`https://bundlephobia.com/result?p=${package.name}`);
};

const openESM = async (package, { shell }) => {
  shell.openExternal(`https://esm.sh/${package.name}`);
};

const openSnykVulnCheck = async (package, { shell }) => {
  shell.openExternal(`https://snyk.io/test/npm/${package.name}`);
};

const copyNpmInstallCommand = async (package, { clipboard }) => {
  clipboard.writeText(`npm install ${package.name}`);
};

const copyYarnInstallCommand = async (package, { clipboard }) => {
  clipboard.writeText(`yarn add ${package.name}`);
};

const copyPackageName = async (package, { clipboard }) => {
  clipboard.writeText(package.name);
};

module.exports = {
  run,
  actions: [
    { name: 'Open NPM Package', action: openNpmPackage },
    { name: 'Open Bundlephobia', action: openBundlephobia },
    { name: 'Open ESM', action: openESM },
    { name: 'Open Snyk Vulnerability Check', action: openSnykVulnCheck },
    { name: 'Copy npm install command', action: copyNpmInstallCommand },
    { name: 'Copy yarn add command', action: copyYarnInstallCommand },
    { name: 'Copy package name', action: copyPackageName },
  ],
};
