const fs = require('fs-extra'),
    path = require('path'),
    npmRun = require('npm-run'),
    chalk = require('chalk'),

    Log = require('./scripts/Log.js'),
    compilePlugins = require('./scripts/compilePlugins.js'),
    importPluginsAssets = require('./scripts/importPluginsAssets.js'),
    validateAllPlugins = require('./scripts/validatePlugins.js'),
    createSymlinks = require('./scripts/createSymlinks.js'),
    createPluginsImportFile = require('./scripts/createImportsFile.js');


const PROJECT_ROOT = path.resolve('.'),
    PLUGIN_DEFINITIONS_PATH = path.resolve('./entando-plugins-config/plugins.json');


var pluginDefs = require(PLUGIN_DEFINITIONS_PATH) || [];


// enhance pluginDefs object to add paths
pluginDefs = pluginDefs.map( (plugin) => {
    let rootPath = path.resolve(plugin.path);
    plugin.path = {
        root: rootPath,
        assets: [ rootPath, 'public/plugin-assets', plugin.name ].join('/'),
        symlink: [ PROJECT_ROOT, 'node_modules', plugin.name ].join('/'),
    };
    return plugin;
});




// -----------------------------------------------------------------------------
// ---------------------- Start import-plugins task ----------------------------
// -----------------------------------------------------------------------------

Log.title('Import Entando plugins - start');

compilePlugins(pluginDefs)
    .then(() => validateAllPlugins(pluginDefs))
    .then(() => importPluginsAssets(pluginDefs))
    .then(() => createSymlinks(pluginDefs))
    .then(() => createPluginsImportFile(pluginDefs))
    .then(
        () => Log.title('Import Entando plugins - SUCCESS'),
        (err) => {
            Log.info('Error:', err);
            Log.title('Import Entando plugins - FAILED');
        }
    );
