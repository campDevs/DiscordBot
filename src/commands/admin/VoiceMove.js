const { Command } = require('discord.js-commando');

module.exports = class VoiceMove extends Command {
  constructor(client) {
    super(client, {
      name: 'voicemove',
      group: 'admin',
      memberName: 'voicemove',
      description: 'Move member to a different voice channel',
      examples: ['voicemove @MicSpammer #annoying'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to move to another voice channel?',
          type: 'member',
        },
        {
          key: 'channel',
          prompt: 'What channel do you want to move them to?',
          type: 'channel',
        },
      ],
      clientPermissions: ['MOVE_MEMBERS'],
      userPermissions: ['MOVE_MEMBERS'],
    });
  }

  async run(msg, { member, channel }) {
    try {
      await member.setVoiceChannel(channel);
      msg.reply(`${member} was moved to ${channel}.`);
    } catch (e) {
      msg.reply(`Failed to move ${member} to ${channel}. Reason: ${e}`);
    }
  }
};
