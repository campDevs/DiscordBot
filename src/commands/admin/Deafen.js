const { Command } = require('discord.js-commando');

module.exports = class DeafenCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'deafen',
      group: 'admin',
      memberName: 'deafen',
      description:
        'Deafen a member preventing them from hearing voice channels',
      examples: ['deafen @IAm12', 'deafen @IAm12 profanity'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to deafen?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to deafen them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['DEAFEN_MEMBERS'],
      userPermissions: ['DEAFEN_MEMBERS'],
    });
  }

  run(msg, { member, reason }) {
    member.setDeaf(true, reason);
    msg.reply(`${member} was deafened.`);
  }
};
