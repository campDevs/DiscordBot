require('dotenv').config()
const file = require('fs')
const logger = require('./utils/logging.js')
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./defaults.json')

// Check for config.json and override defaults
if (file.existsSync(path.join(__dirname, '../config.json'))) {
  Object.assign(config, require('../config.json'))
}

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owners,
  disableEveryone: true,
  unknownCommandResponse: false
})
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["admin", "Admin commands"],
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

function sendMsgToAuditChannel(guild, msg) {
  if (guild.channels.has(config.auditChannel)) {
    let auditChannel = guild.channels.find("name", config.auditChannel)
    auditChannel.sendMessage(msg)
  }
}

client.on('guildMemberRemove', member => {
  let guild = member.guild
  sendMsgToAuditChannel(guild, `${member.user.username} quit or was removed from the discord guild.`)
})

client.on('guildBanRemove', (guild, user) => {
  sendMsgToAuditChannel(guild, `${user.username} was unbanned.`)
})

client.on('guildBanAdd', (guild, user) => {
  sendMsgToAuditChannel(guild, `${user.username} was banned.`)
})

client.login(process.env.TOKEN)
