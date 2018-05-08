const fs = require('fs-extra');
const chalk = require('chalk');
const Log = require('./Log.js');


// -----------------------------------------------------------------------------
// ------------------------- Plugins validation --------------------------------
// -----------------------------------------------------------------------------

function validatePlugin(plugin) {
  // a valid plugin must have:
  // - a pluginBuild/static/js/main.js file
  // - a pluginBuild/static/css/main.css file
  // - a public/plugin-assets/<PLUGIN_NAME>/ directory
  // a valid plugin js module must export:
  // - id : String
  // - locales : array<{ locale : string, messages : Object<string, string> }>
  // - uiComponent : React.Component
  // - reducer : function (Redux reducer)

  const PATH_JS = plugin.path.root;
  const PATH_CSS = `${plugin.path.root}/dist/index.css`;

  const rejectIfNotExists = path => (exists) => {
    if (!exists) {
      throw new Error(`path ${chalk.grey(path)} does not exist`);
    }
  };


  const cssFilePromise = fs.pathExists(PATH_CSS)
    .then(rejectIfNotExists(PATH_CSS));

  const assetsDirPromise = fs.pathExists(plugin.path.assets)
    .then(rejectIfNotExists(plugin.path.assets));

  const jsFilePromise = fs.pathExists(PATH_JS)
    .then(rejectIfNotExists(PATH_JS));

  return Promise.all([jsFilePromise, cssFilePromise, assetsDirPromise])
    .then(() => {
      Log.check(`${chalk.magenta(plugin.name)} is a valid Entando plugin`);
    });
}

// validate all the plugins
function validateAllPlugins(pluginDefs) {
  Log.section('Validating plugins');

  const validatePromises = pluginDefs.map(plugin => validatePlugin(plugin));

  return Promise.all(validatePromises)
    .then(
      Log.resolved('Plugins validation completed'),
      Log.rejected('Plugins validation failed'),
    ).catch(arg => console.log(arg));
}

module.exports = validateAllPlugins;
