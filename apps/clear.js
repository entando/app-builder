const program = require('commander');
const Log = require('@entando/log');
const createEmptyFile = require('./createEmptyFile');

program.version('1.0.0')
  .name('npm run app-clear')
  .action(() => {
    Log.section('removing apps from app-builder');
    createEmptyFile();
    Log.empty(1).success('apps uninstalled');
  });

program.parse(process.argv);
