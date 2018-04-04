const {Command} = require('discord.js-commando')

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      group: "humor",
      memberName: "roll",
      description: "**** roll"
    })
  }

  run(msg) {
    return msg.embed(
      {
        "title": "Inportant info",
        "description": "Check out [this](https://youtu.be/dQw4w9WgXcQ) link",
        "color": 10620776
      }
    )
  }
}