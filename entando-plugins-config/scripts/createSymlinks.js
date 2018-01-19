const fs = require('fs-extra'),
    chalk = require('chalk'),

    Log = require('./Log.js');
// -----------------------------------------------------------------------------
// ----------------------- Symbolic links creation -----------------------------
// -----------------------------------------------------------------------------


function createPluginSymlink(plugin) {
  return new Promise((resolve, reject) => {

    Log.info('Creating symlink for plugin ' + chalk.magenta(plugin.name) + ' at ' + chalk.grey(plugin.path.symlink));

    fs.symlink(plugin.path.root, plugin.path.symlink, 'dir', (err) => {
      if (err) {
        Log.info('Error creating symlink for plugin ' + chalk.magenta(plugin.name));
        reject(err);
      } else {
        Log.info('Created symlink for plugin ' + chalk.magenta(plugin.name));
        resolve();
      }
    });
  });
}


// create symlinks to plugins node modules
function createAllSymlinks(pluginDefs) {

  Log.section('Creating symlinks in node_modules');

  var symlinkPromises = [];
  pluginDefs.forEach((plugin) => {
    var symlinkPromise = fs.pathExists(plugin.path.symlink)
      .then((exists) => {
        if (exists) {
          Log.info('Symlink for plugin ' + chalk.magenta(plugin.name) + ' already exists');
        } else {
          return createPluginSymlink(plugin);
        }
      });
    symlinkPromises.push(symlinkPromise);
  });

  return Promise.all(symlinkPromises).then(
    Log.resolved('\nSymbolic links created'),
    Log.rejected('\nSymbolic links creation failed')
  );
}

module.exports = createAllSymlinks;
