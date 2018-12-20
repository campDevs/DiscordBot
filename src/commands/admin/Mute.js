const { Command } = require('discord.js-commando');

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'mute',
      group: 'admin',
      memberName: 'mute',
      description: 'Set member muted on voice channels',
      examples: ['mute @MicSpammer', 'mute @MicSpammer Singing endlessly'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to mute?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to mute them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['MUTE_MEMBERS'],
      userPermissions: ['MUTE_MEMBERS'],
    });
  }

  run(msg, { member, reason }) {
    member.setMute(true, reason);
    msg.reply(`${member} was muted.`);
  }
};
