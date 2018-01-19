const fs = require('fs-extra'),
  path = require('path'),
  chalk = require('chalk'),
  Log = require('./Log.js');


const MAIN_ASSETS_PATH = path.resolve('./public/plugin-assets');



// -----------------------------------------------------------------------------
// ------------------------ Plugins assets import ------------------------------
// -----------------------------------------------------------------------------

/**
 * Copy plugin assets directories into main plugins assets directory
 * This method uses fs-extra features
 */
function importPluginAssets(pluginDefs) {

  Log.section('Importing plugin assets');

  let promises = [];
  pluginDefs.forEach((plugin) => {
    let sourcePath = plugin.path.assets,
    targetPath = MAIN_ASSETS_PATH + '/' + plugin.name;

    Log.info('Importing ' + chalk.magenta(plugin.name) + ' assets');
    let promise = fs.pathExists(sourcePath)
      .then((exists) => {
        if (exists) {
          return fs.pathExists(targetPath);
        } else {
          throw 'Source path "' + sourcePath + '" does not exists';
        }
      })
      .then((exists) => {
        if (exists) {
          Log.info('  removing old assets directory...');
          return fs.remove(targetPath);
        }
      })
      .then(() => {
        Log.info('  copying assets directory');
        Log.info('     from ' + chalk.grey(sourcePath));
        Log.info('     to   ' + chalk.grey(targetPath));
        return fs.copy(sourcePath, targetPath);
      })
      .then(() => {
        Log
        .empty()
        .check('Assets for ' + chalk.magenta(plugin.name) + ' imported')
        .empty();
      })
      .catch((err) => {
        Log.info('Error copying assets');
      });

    Log.info('\n');
    promises.push(promise);
  });

  return Promise.all(promises).then(
    Log.resolved('Plugins assets import completed'),
    Log.rejected('Plugins assets import failed')
  );
}

module.exports = importPluginAssets;
