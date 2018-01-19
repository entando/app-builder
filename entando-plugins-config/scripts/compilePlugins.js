const npmRun = require('npm-run'),
  chalk = require('chalk'),
  Log = require('./Log.js');


// -----------------------------------------------------------------------------
// ------------------------- Plugins compilation -------------------------------
// -----------------------------------------------------------------------------

function compilePlugin(plugin) {
  return new Promise((resolve, reject) => {

    Log.info('Compiling plugin ' + chalk.magenta(plugin.name));

    npmRun.exec('npm run -s build-plugin', { cwd: plugin.path.root }, (err, stdout, stderr) => {
      // err Error or null if there was no error
      // stdout Buffer|String
      // stderr Buffer|String
      if (err) {
        Log.cross('Error compiling plugin ' + chalk.magenta(plugin.name));
        // show the compilation error message
        process.stdout.write(stdout);
        reject({ err: err, stdout: stdout, stderr: stderr });
      } else {
        // process.stdout.write(stdout);
        Log.check('Plugin ' + chalk.magenta(plugin.name) + ' compiled.');
        resolve({ err: err, stdout: stdout, stderr: stderr });
      }
    });
  });
}


// compile all the plugins
function compileAllPlugins(pluginDefs) {

  Log.section('Compiling plugins');

  var compilePromises = [];
  pluginDefs.forEach((plugin) => {
    var compilePromise = compilePlugin(plugin);
    compilePromises.push(compilePromise);
  });

  return Promise.all(compilePromises)
    .then(
      Log.resolved('Plugins compilation completed'),
      Log.rejected('Plugins compilation failed')
    );
}

module.exports = compileAllPlugins;
