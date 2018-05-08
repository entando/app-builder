const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const Log = require('./Log.js');

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

  const promises = [];
  pluginDefs.forEach((plugin) => {
    const sourcePath = plugin.path.assets;
    const targetPath = `${MAIN_ASSETS_PATH}/${plugin.name}`;

    Log.info(`Importing ${chalk.magenta(plugin.name)} assets`);
    const promise = fs.pathExists(sourcePath)
      .then((exists) => {
        if (exists) {
          return fs.pathExists(targetPath);
        }
        throw new Error(`Source path "${sourcePath}" does not exists`);
      })
      .then((exists) => {
        if (exists) {
          Log.info('  removing old assets directory...');
          return fs.remove(targetPath);
        }
        return null;
      })
      .then(() => {
        Log.info('  copying assets directory');
        Log.info(`     from ${chalk.grey(sourcePath)}`);
        Log.info(`     to   ${chalk.grey(targetPath)}`);
        return fs.copy(sourcePath, targetPath);
      })
      .then(() => {
        Log
          .empty()
          .check(`Assets for ${chalk.magenta(plugin.name)} imported`)
          .empty();
      })
      .catch((err) => {
        Log.info('Error copying assets');
        console.log(err);
      });

    Log.info('\n');
    promises.push(promise);
  });

  return Promise.all(promises).then(
    Log.resolved('Plugins assets import completed'),
    Log.rejected('Plugins assets import failed'),
  );
}

module.exports = importPluginAssets;
