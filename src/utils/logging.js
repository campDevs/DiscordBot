const colors = require('colors/safe')
const { red, green, yellow } = require('chalk')

colors.setTheme({
  warn: "yellow",
  error: "red",
  debug: "blue",
  info: "green",
  data: "grey",
  help: "magenta"
})

console.red =
  console.red ||
  function(message) {
    console.error(red(message))
  }
console.green =
  console.green ||
  function(message) {
    console.log(green(message))
  }
console.yellow =
  console.yellow ||
  function(message) {
    console.warn(yellow(message))
  }

module.exports = {
  log: (...parameters) => console.log(colors.data(parameters.join(' '))),
  error: (...parameters) => console.error(colors.error(parameters.join(' '))),
  warn: (...parameters) => console.warn(colors.warn(parameters.join(' '))),
  info: (...parameters) => console.info(colors.info(parameters.join(' '))),
  help: (...parameters) => console.help(colors.help(parameters.join(' '))),
  debug: (...parameters) => console.debug(colors.debug(parameters.join(' ')))
}
