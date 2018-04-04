const {Command} = require('discord.js-commando')

module.exports = class FormatCommand extends Command {
  constructor(client) {
    super(client, {
      name: "format",
      group: "code",
      memberName: "format",
      description: "Formats code in the provided language",
      examples: [
        "format js console.log(\"hello world!\");",
        "format go fmt.Println(\"Hello world!\")" ],
      args: [
        {
          key: "lang",
          prompt: "What language do you want to format to?",
          type: "string",
          default: "js"
        },
        {
          key: "code",
          prompt: "What is the snippet of code you want to format?",
          type: "string"
        }
      ]
    })
  }

  async run(msg, {lang, code}) {
    msg.reply("here is your code formatted:")
    msg.code(lang, code)
    try {
      await msg.delete()
    } catch(err) {
      console.error(err)
    }
  }
}