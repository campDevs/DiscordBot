const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'admin',
      memberName: 'kick',
      description: 'Kicks a server member',
      examples: ['kick @Zac spamming smalltalk', 'kick @Zac'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to kick?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to kick them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
    });
  }

  run(msg, { member, reason }) {
    if (member.kickable) {
      member.kick(reason);
    } else {
      msg.author.send(`${member} is not kickable.`);
    }
  }
};
