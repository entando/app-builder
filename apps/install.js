const program = require('commander');
const Log = require('./Log');
const { execSync } = require('child_process');
const createAppsImportFile = require('./createImportsFile');

program.version('1.0.0')
  .name('npm run app-install')
  .arguments('<app>')
  .option('-p, --packageName <packageName>', 'name of the package')
  .option('-d, --dev <path>', 'install app in development')
  .action((app, { dev, packageName }) => {
    const appFullName = !dev ? `@entando/${app}` : app;
    const appPackageName = packageName || appFullName;
    Log.section(`installing ${appFullName}`);
    if (!dev) {
      execSync(`npm install --no-save ${appFullName}`, { stdio: [0, 1, 2] });
    } else {
      Log.info(`installing from ${dev}`).empty(1);
      execSync(`npm link --only=production ${dev}`, { stdio: [0, 1, 2] });
    }
    Log.empty(1).success('installation complete');
    Log.section(`adding ${appFullName} to app-builder`);
    createAppsImportFile(appFullName, app, appPackageName);
  });

program.parse(process.argv);
