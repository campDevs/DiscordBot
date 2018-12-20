const { Command } = require('discord.js-commando');

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'admin',
      memberName: 'ban',
      description:
        'Bans a person and if desired, removes day/days of their messages',
      examples: [
        'ban @Bryan spamming codefights',
        'ban @Bryan spamming codefights 10',
      ],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to ban?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to ban them?',
          type: 'string',
          default: "'None provided'",
        },
        {
          key: 'purge_days',
          prompt: 'How many days of messages do you want to purge?',
          default: 0,
          type: 'integer',
        },
      ],
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
    });
  }

  run(msg, { member, reason, purge_days }) {
    if (member.bannable) {
      member.ban({ reason, days: purge_days });
    } else {
      msg.author.send(`${member} is not bannable.`);
    }
  }
};
