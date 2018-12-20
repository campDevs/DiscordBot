const { Command } = require('discord.js-commando');

module.exports = class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'togglemute',
      group: 'admin',
      memberName: 'togglemute',
      description: 'Toggles member muted or unmuted on voice channels',
      examples: [
        'togglemute @MicSpammer',
        'togglemute @MicSpammer Singing endlessly',
      ],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to toggle muted/unmuted?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to mute/unmute them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['MUTE_MEMBERS'],
      userPermissions: ['MUTE_MEMBERS'],
    });
  }

  run(msg, { member, reason }) {
    if (member.serverMute) {
      member.setMute(false, reason);
      msg.reply(`${member} was unmuted.`);
    } else {
      member.setMute(true, reason);
      msg.reply(`${member} was muted.`);
    }
  }
};
