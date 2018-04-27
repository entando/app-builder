const chalk = require('chalk');
const npmRun = require('npm-run');
const Log = require('./Log.js');
// -----------------------------------------------------------------------------
// ---------------------------- Plugins build ----------------------------------
// -----------------------------------------------------------------------------


function buildPlugin(plugin) {
  return new Promise((resolve, reject) => {
    Log.info(`Running ${chalk.grey('npm run build-plugin')} on ${chalk.magenta(plugin.name)}`);
    npmRun('npm run build-plugin', { cwd: plugin.path.root }, (err) => {
      if (err) {
        Log.info(`Error running "npm run build-plugin" for plugin ${chalk.magenta(plugin.name)}`);
        console.log(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}


// create symlinks to plugins node modules
function buildAllPlugins(pluginDefs) {
  Log.section('Building plugins');

  const promises = pluginDefs.map(buildPlugin);

  return Promise.all(promises).then(
    Log.resolved('\nPlugins build success'),
    Log.rejected('\nPlugins build failed'),
  );
}

module.exports = buildAllPlugins;
