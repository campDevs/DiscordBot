const { Command } = require('discord.js-commando');

module.exports = class UndeafenCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'undeafen',
      group: 'admin',
      memberName: 'undeafen',
      description: 'Undeafen a member allowing them to hear voice channels',
      examples: ['undeafen @IAm12', 'undeafen @IAm12 Safe to listen'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to undeafen?',
          type: 'member',
        },
        {
          key: 'reason',
          prompt: 'Why do you want to undeafen them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['DEAFEN_MEMBERS'],
      userPermissions: ['DEAFEN_MEMBERS'],
    });
  }

  run(msg, { member, reason }) {
    member.setDeaf(false, reason);
    msg.reply(`${member} was undeafened.`);
  }
};
