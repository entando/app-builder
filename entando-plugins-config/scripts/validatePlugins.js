const fs = require('fs-extra'),
    chalk = require('chalk'),
    Log = require('./Log.js');


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

  const PATH_JS = plugin.path.root + '/pluginBuild/static/js/main.js';
  const PATH_CSS = plugin.path.root + '/pluginBuild/static/css/main.css';

  const rejectIfNotExists = path => (exists) => {
    if (!exists) {
      throw 'path ' + chalk.grey(path) + ' does not exist';
    }
  };

  const checkExported = (pluginModule, prop, type) => {
    const valid = (pluginModule[prop] && typeof pluginModule[prop] === type);
    if (!valid) {
      Log.cross('Plugin ' +
        chalk.magenta(plugin.name) +
        ' must export a property ' +
        chalk.cyan(prop) +
        ' of type ' +
        chalk.yellow(type));
    }
    return valid;
  };

  const isLocalesValid = (locales) => {
    if (!Array.isArray(locales)) {
      return false;
    }
    let isValid = true;
    locales.forEach((locale) => {
      if (typeof locale.locale !== 'string' ||
          typeof locale.messages !== 'object') {
        isValid = false;
        return;
      }
      for (let key in locale.messages) {
        if (typeof locale.messages[key] !== 'string') {
          isValid = false;
          return;
        }
      }
    });
    if (!isValid) {
      Log.cross('Plugin ' +
        chalk.magenta(plugin.name) +
        ' property ' +
        chalk.cyan('locales') +
        ' is invalid');
    }
    return isValid;
  };

  const cssFilePromise = fs.pathExists(PATH_CSS)
    .then(rejectIfNotExists(PATH_CSS));

  const assetsDirPromise = fs.pathExists(plugin.path.assets)
    .then(rejectIfNotExists(plugin.path.assets));

  const jsFilePromise = fs.pathExists(PATH_JS)
    .then(rejectIfNotExists(PATH_JS));

  return Promise.all([jsFilePromise, cssFilePromise, assetsDirPromise])
    .then(() => {
      Log.check(chalk.magenta(plugin.name) + ' is a valid Entando plugin');
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
