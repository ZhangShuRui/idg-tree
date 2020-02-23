const chalk = require('chalk');

function error(...msg) {
  console.log(chalk.red('Error:') + chalk.red(...msg))
}
function warning(...msg) {
  console.log(chalk.yellow('Warning:') + chalk.yellow(...msg))
}
function info(...msg) {
  console.log(chalk.blue('info:') + chalk.blue(...msg))
}
function success(...msg) {
  console.log(chalk.green('Success:') + chalk.green(...msg))
}

module.exports = print = {
  error,
  warning,
  info,
  success
}
