const chalk = require('chalk');

const padCenter = (text) => {
    let padLenght = 80 - text.length,
        halfPad = ' '.repeat(padLenght/2);
    return  halfPad + text + halfPad;
};
const Log = {
  title: (text) => {
    console.log('='.repeat(80));
    console.log(padCenter(text.toUpperCase()));
    console.log('='.repeat(80));
    return Log;
  },
  section: (text) => { console.log('\n' + chalk.cyan(text.toUpperCase()) + '\n'); return Log;},
  info: (text) => { console.log('  ' + text); return Log;},
  check: (text) => { console.log(chalk.green('  \u2714 ') + text); return Log;},
  cross: (text) => { console.log(chalk.red('  \u2716 ') + text); return Log;},
  success: (text) => { console.log('  ' + chalk.green(text)); return Log;},
  error: (text, err) => { console.log('  ' + chalk.red(text), err); return Log;},
  empty: (times) => { console.log('\n'.repeat(times || 1)); return Log; },

  resolved: (text) => () => console.log('  ' + chalk.green(text)),
  rejected: (text) => (err) => { console.log('  ' + chalk.red(text)); throw err }
};

module.exports = Log;
