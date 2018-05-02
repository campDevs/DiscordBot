require('dotenv').config()
const config = require('./config.json')
const data = require('./data.json')
const colors = require('colors/safe')
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const INSULT_FREQUENCY = 0.1

colors.setTheme({
  warn: "yellow",
  error: "red",
  debug: "blue",
  info: "green",
  data: "grey",
  help: "magenta"
})

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
    ["fetch", "Fetch data from websites"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.on("error", error => console.error(colors.error(error)))
client.on("warn", warning => console.warn(colors.warn(warning)))
client.on("debug", dbgMsg => console.debug(colors.debug(dbgMsg)))
client.on('ready', () => {
  console.log(colors.america(`
  Horrorhaku Bot
     T
   .-"-.
  |  ___|
  | (.\\/.)
  |  ,,,' 
  | '###
  '----'  
  Connected as: ${client.user.tag}!`))
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
