const {Command} = require('discord.js-commando')

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "rickroll",
      group: "humor",
      memberName: "rickroll",
      description: "Rick Astley - Never Gonna Give You Up command",
      throttling: { 
        usages: 2, 
        duration: 15
      }
    })
  }

  run(msg) {
    return msg.embed(
      {
        title: "Rickroll",
        description: "[Rick Astley - Never Gonna Give You Up](https://www.youtube.com/watch?v=dQw4w9WgXcQ)",
        color: 10620776,
        image: {
          url: "https://media.giphy.com/media/Vuw9m5wXviFIQ/giphy.gif" 
        }
      }
    )
  }
}