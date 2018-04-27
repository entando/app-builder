const path = require('path');

const Log = require('./scripts/Log.js');
const importPluginsAssets = require('./scripts/importPluginsAssets.js');
const validateAllPlugins = require('./scripts/validatePlugins.js');
const createSymlinks = require('./scripts/createSymlinks.js');
const createPluginsImportFile = require('./scripts/createImportsFile.js');
const buildPlugins = require('./scripts/buildPlugins.js');


const PROJECT_ROOT = path.resolve('.');
const PLUGIN_DEFINITIONS_PATH = path.resolve('./entando-plugins-config/plugins.json');


const pluginDefs = require(PLUGIN_DEFINITIONS_PATH) || [];


// enhance pluginDefs object to add paths
const pluginDefsEnhanced = pluginDefs.map((plugin) => {
  const rootPath = path.resolve(plugin.path);
  const res = { ...plugin };
  res.path = {
    root: rootPath,
    assets: [rootPath, 'public/plugin-assets', plugin.name].join('/'),
    symlink: [PROJECT_ROOT, 'node_modules', plugin.name].join('/'),
  };
  return res;
});


// -----------------------------------------------------------------------------
// ---------------------- Start import-plugins task ----------------------------
// -----------------------------------------------------------------------------

Log.title('Import Entando plugins - start');
buildPlugins(pluginDefsEnhanced)
  .then(() => validateAllPlugins(pluginDefsEnhanced))
  .then(() => importPluginsAssets(pluginDefsEnhanced))
  .then(() => createSymlinks(pluginDefsEnhanced))
  .then(() => createPluginsImportFile(pluginDefsEnhanced))
  .then(
    () => Log.title('Import Entando plugins - SUCCESS'),
    (err) => {
      Log.info('Error:', err);
      Log.title('Import Entando plugins - FAILED');
    },
  );
