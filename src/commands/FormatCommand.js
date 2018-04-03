const {Command} = require('discord.js-commando')

module.exports = class FormatCommand extends Command {
  constructor(client) {
    super(client, {

    })
  }
  async run(msg, lang, code) {
    const [lang, ...code] = parseArgs(msg.content, formatCommand)
    msg.reply(`\`\`\`${lang}\n${code.join(" ")}\n\`\`\``)

    try {
      await msg.delete()
    } catch(err) {
      console.error(err)
    }
  }
}