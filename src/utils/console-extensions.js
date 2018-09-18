const { red, green, yellow } = require('chalk');

console.red =
  console.red ||
  function(message) {
    console.log(red(message));
  };

console.green =
  console.green ||
  function(message) {
    console.log(green(message));
  };

console.yellow =
  console.yellow ||
  function(message) {
    console.log(yellow(message));
  };
