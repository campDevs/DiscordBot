require('dotenv').config()
const config = require('./config.json')
const logger = require('./utils/logging.js')
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: process.env.BOT_OWNER,
  disableEveryone: true,
  unknownCommandResponse: false
})
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["music", "Music related commands"],
    ["code", "Code related commands"],
    ["assistants", "Commands to assist the bot overlord(s)"],
    ["humor", "Bot's humor processing unit"],
    ["scrapers", "Scrape for data from remote sources"],
    ["fetch", "Fetch data from websites"],
    ["fun", "Games bot's like to play"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.on("error", error => logger.error(error))
client.on("warn", warning => logger.warn(warning))
client.on("debug", dbgMsg => logger.debug(dbgMsg))
client.on('ready', () => {
  logger.info(`
  Horrorhaku Bot
     T
   .-"-.
  |  ___|
  | (.\\/.)
  |  ,,,' 
  | '###
  '----'  
  Connected as: ${client.user.tag}!`)
  client.user.setActivity("Barbie Adventures")
})

// React randomly to other bots
client.on('message', async msg => {
  if (msg.author.bot) {
    if (msg.author.id !== client.user.id && Math.random() <= 0.1) {
      msg.react("🤖")
    }
    return
  }
})

client.login(process.env.TOKEN)
