const fs = require('fs-extra');
const chalk = require('chalk');
const npmRun = require('npm-run');
const Log = require('./Log.js');
// -----------------------------------------------------------------------------
// ----------------------- Symbolic links creation -----------------------------
// -----------------------------------------------------------------------------


function createPluginSymlink(plugin) {
  return new Promise((resolve, reject) => {
    Log.info(`Creating symlink for plugin ${chalk.magenta(plugin.name)} at ${chalk.grey(plugin.path.symlink)}`);
    npmRun('npm link', { cwd: plugin.path.root }, (err) => {
      if (err) {
        Log.info(`Error running "npm link" for plugin ${chalk.magenta(plugin.name)}`);
        console.log(err);
        reject(err);
        return;
      }
      npmRun(`npm link ${plugin.name}`, { cwd: process.cwd() }, (err2) => {
        if (err2) {
          Log.info(`Error running "npm link ${chalk.magenta(plugin.name)}"`);
          console.log(err2);
          reject(err2);
          return;
        }
        Log.info(`Created symlink for plugin ${chalk.magenta(plugin.name)}`);
        resolve();
      });
    });
  });
}


// create symlinks to plugins node modules
function createAllSymlinks(pluginDefs) {
  Log.section('Creating symlinks in node_modules');

  const symlinkPromises = [];
  pluginDefs.forEach((plugin) => {
    const symlinkPromise = fs.pathExists(plugin.path.symlink)
      .then((exists) => {
        if (!exists) {
          return createPluginSymlink(plugin);
        }
        Log.info(`Symlink for plugin ${chalk.magenta(plugin.name)} already exists`);
        return Promise.resolve();
      });
    symlinkPromises.push(symlinkPromise);
  });

  return Promise.all(symlinkPromises).then(
    Log.resolved('\nSymbolic links created'),
    Log.rejected('\nSymbolic links creation failed')
  );
}

module.exports = createAllSymlinks;
