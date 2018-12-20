const { Command } = require('discord.js-commando');

module.exports = class UnmuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'unmute',
      group: 'admin',
      memberName: 'unmute',
      description: 'Set member unmuted on voice channels',
      examples: ['unmute @MicSpammer', 'unmute @MicSpammer Agreed to stop'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to unmute?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to unmute them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['MUTE_MEMBERS'],
      userPermissions: ['MUTE_MEMBERS'],
    });
  }

  run(msg, { member, reason }) {
    member.setMute(false, reason);
    msg.reply(`${member} was unmuted.`);
  }
};
