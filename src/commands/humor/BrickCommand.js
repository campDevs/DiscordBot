const {Command} = require('discord.js-commando')

module.exports = class BrickCommand extends Command {
  constructor(client) {
    super(client, {
      name: "brick",
      group: "humor",
      memberName: "brick",
      description: "Brick screaming"
    })
  }

  run(msg) {
    return msg.say('https://youtu.be/7pdWAcK6Eh8')
  }
}