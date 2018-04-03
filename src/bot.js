require('dotenv').config()
// const Discord = require('discord.js')
const config = require('./config.json')
const data = require('./data.json')
const ytdl = require('ytdl-core')
const colors = require('colors/safe')
const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
  commandPrefix: '/',
  owner: '109163410825986048',
  disableEveryone: true
})

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['music', 'Music related commands']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'))

colors.setTheme({
  warn: "yello",
  error: "red",
  debug: "blue",
  info: "green",
  data: "grey",
  help: "magenta"
})

const INSULT_FREQUENCY = 0.1

client.on("error", logError)
client.on("warn", logWarning)
client.on("debug", logDbg)

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
  client.user.setActivity("Strip poker")
})

client.on('guildBanAdd', member => {
  console.log(member)
  // client.channels.forEach( channel => channel.send(`Ohh snap! ${member} was banned!`))
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

  if (msg.content.startsWith(`${config.prefix}ping`)) {
    msg.reply('pong')
  }

  const formatCommand = `${config.prefix}format`
  if (msg.content.startsWith(formatCommand)) {
    const [lang, ...code] = parseArgs(msg.content, formatCommand)
    msg.reply(`\`\`\`${lang}\n${code.join(" ")}\n\`\`\``)

    try {
      await msg.delete()
    } catch(err) {
      console.error(err)
    }
  }

  const idMeCommand = `${config.prefix}idme`
  if (msg.content.startsWith(idMeCommand)) {
    client.users.get(msg.author.id).send(msg.author.id)

    try {
      await msg.delete()
    } catch (error) {
      console.error(error)
    }
  }

  if (Math.random() <= INSULT_FREQUENCY) {
    const insultNum = getRandomInt(0, data.insults.length)
    msg.reply(data.insults[insultNum].replace("%U", msg.author.username))
  }

  const lmgtfyCommand = `${config.prefix}lmgtfy`
  if (msg.content.startsWith(lmgtfyCommand)) {
    const query = msg.content.slice(formatCommand.length + 1)
    msg.reply(`http://lmgtfy.com/?q=${encodeURIComponent(query)}`)
  }

  if (msg.content.startsWith("!roll")) {
    msg.channel.send("https://youtu.be/dQw4w9WgXcQ")
  }

  if (msg.content.startsWith("!about")) {
    try {
      const message = await msg.channel.send(`
      Horrorhaku Bot!

      By horrorvacui
      `)
      message.react("🤘")
    } catch(error) {
      logError(error)
    }
  }

  if (msg.content.startsWith("!question")) {
    msg.channel.send("How many fingers am I holding up?")
  }

  if (msg.content.startsWith("!brick")) {
    msg.channel.send('https://youtu.be/7pdWAcK6Eh8')
  }

  if (msg.content.startsWith("!sexypic")) {
    // msg.channel.sendEmbed()
    msg.channel.send({
      "embed":{
        title: "Robot Danceoff",
        color: 0xf442ce,
        author: { name: client.user.username, icon_url: client.user.avatarURL },
        image: {
          url: "http://i.imgur.com/wDgO8up.gif"
        }
      }
    })
  }
})

// From MDN Math.random
function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function parseArgs(msgContent, command) {
  return msgContent.slice(command.length).trim().split(" ")
}

function logError(error) {
  console.error(colors.error(error))
}

function logWarning(warning) {
  console.warn(colors.warn(warning))
}

function logDbg(dbgMsg) {
  console.debug(colors.debug(dbgMsg))
}

client.on('guildBanAdd', member => {
  console.log("someone got banned")
})

client.login(process.env.TOKEN)