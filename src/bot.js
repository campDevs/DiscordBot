require('dotenv').config()
// const Discord = require('discord.js')
const config = require('./config.json')
const data = require('./data.json')
const colors = require('colors/safe')
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const INSULT_FREQUENCY = 0.1

colors.setTheme({
  warn: "yello",
  error: "red",
  debug: "blue",
  info: "green",
  data: "grey",
  help: "magenta"
})

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: '109163410825986048',
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
    ["scrapers", "Scrape or data from remote sources"],
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
client.on('message', async msg => {
  if (msg.author.bot) {
    if (msg.author.id !== client.user.id && Math.random() <= 0.1) {
      msg.react("🖕")
      msg.react("🔫")
      msg.react("🤖")
    }
    return
  }

  // if (Math.random() <= INSULT_FREQUENCY) {
  //   const insultNum = getRandomInt(0, data.insults.length)
  //   msg.reply(data.insults[insultNum].replace("%U", msg.author.username))
  // }
})

// From MDN Math.random
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

client.login(process.env.TOKEN)