const Log = require('./Log');

if (!process.argv[2]) {
  Log.error('no app specified');
  process.exit();
}

const appId = process.argv[2];
const app = `@entando/${appId}`;
Log.section(`installing ${app}`);

const { execSync } = require('child_process');

execSync(`npm install --no-save ${app}`, { stdio: [0, 1, 2] });

Log.section(`adding ${app} to app-builder`);

const createAppsImportFile = require('./createImportsFile');

createAppsImportFile(app, appId);
