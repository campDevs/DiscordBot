require('dotenv').config();
require('./utils/console-extensions');
const file = require('fs');
const logger = require('./utils/logging.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const config = require('./defaults.json');
const fetch = require('node-fetch');

// Check for config.json and override defaults
if (file.existsSync(path.join(__dirname, '../config.json'))) {
  Object.assign(config, require('../config.json'));
}

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owners,
  disableEveryone: true,
  unknownCommandResponse: false
});
client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['admin', 'Admin commands'],
    ['music', 'Music related commands'],
    ['code', 'Code related commands'],
    ['assistants', 'Commands to assist the bot overlord(s)'],
    ['humor', "Bot's humor processing unit"],
    ['scrapers', 'Scrape for data from remote sources'],
    ['fetch', 'Fetch data from websites'],
    ['fun', "Games bot's like to play"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('error', error => logger.error(error));
client.on('warn', warning => logger.warn(warning));
client.on('debug', dbgMsg => logger.debug(dbgMsg));
client.on('ready', () => {
  logger.info(`
  Campy the Discord Bot
     T
   .-"-.
  |  ___|
  | (.\\/.)
  |  ,,,'
  | '###
  '----'
  Connected as: ${client.user.tag}!`);
  client.user.setActivity('Bot Stuff');
});

// React randomly to other bots
client.on('message', async msg => {
  if (msg.author.bot) {
    if (msg.author.id !== client.user.id && Math.random() <= 0.1) {
      msg.react('🤖');
    }
    return;
  }
});

function sendMsgToAuditChannel(guild, msg) {
  let auditChannel = guild.channels.find('name', config.auditChannel);
  if (auditChannel && config.adminTransparency) {
    auditChannel.send(msg);
  }
}

client.on('guildMemberRemove', member => {
  let guild = member.guild;
  sendMsgToAuditChannel(
    guild,
    `${member.user.username} quit or was removed from the discord guild.`
  );
});

client.on('guildBanRemove', (guild, user) => {
  sendMsgToAuditChannel(guild, `${user.username} was unbanned.`);
});

client.on('guildBanAdd', (guild, user) => {
  sendMsgToAuditChannel(guild, `${user.username} was banned.`);
});

client.login(process.env.TOKEN).catch(error => {
  console.red(error + '\n');
});

// create or check for fcc curriculum json file
async function getCurriculum() {
  if (file.existsSync('src/commands/scrapers/data/fcc/challengeData.json')) {
    return;
  }

  let data = [];
  const githubURI =
    'https://raw.githubusercontent.com/freeCodeCamp/curriculum/dev/challenges';
  try {
    const githubEndpoints = JSON.parse(
      file.readFileSync('src/commands/scrapers/data/fcc/githubEndpoints.json')
    );
    for (let majorCategory in githubEndpoints) {
      for (let minorCategory of githubEndpoints[majorCategory]) {
        const githubRes = await fetch(
          `${githubURI}/${majorCategory}/${minorCategory}.json`
        );
        const githubData = await githubRes.json();
        data.push(githubData);
      }
    }
    file.writeFile(
      'src/commands/scrapers/data/fcc/challengeData.json',
      JSON.stringify(data),
      err => {
        if (err) throw err;
      }
    );
  } catch (error) {
    console.error(error);
  }
}

getCurriculum();
