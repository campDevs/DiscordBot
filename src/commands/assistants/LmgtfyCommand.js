const {Command} = require('discord.js-commando')

module.exports = class LmgtfyCommand extends Command {
  constructor(client) {
    super(client, {
      name: "lmgtfy",
      group: "assistants",
      memberName: "lmgtfy",
      description: "Google for slow people",
      examples: [
        "lmgtfy js vs python",
        "lmgtfy How do I google something?" ],
      args: [
        {
          key: "query",
          prompt: "What do you want to google?",
          type: "string"
        }
      ]
    })
  }

  run(msg, {query}) {
    return msg.reply(`http://lmgtfy.com/?q=${encodeURIComponent(query)}`)
  }
}
