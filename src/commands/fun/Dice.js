const {Command} = require('discord.js-commando')

module.exports = class DiceCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dice",
      group: "fun",
      memberName: "dice",
      description: "Rolls a random number",
      examples: [
        "dice 1 100",
        "dice 10" ],
      args: [
        {
          key: "start",
          prompt: "Starting from what number?",
          type: "integer",
          max: 100000000,
          min: -100000000,
          default: 0
        },
        {
          key: "end",
          prompt: "Ending with what number?",
          type: "integer",
          max: 100000000,
          min: -100000000,
          default: 10
        }
      ]
    })
  }

  run(msg, {start, end}) {
    let number = Math.floor(Math.random() * (end - start + 1) + start)
    msg.reply(`Rolling dice for number in ${start}-${end}: ${number}`)
  }
}
