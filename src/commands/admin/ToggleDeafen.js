const { Command } = require('discord.js-commando');

module.exports = class ToggleDeafenCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'toggledeaf',
      group: 'admin',
      memberName: 'toggledeaf',
      description: 'Toggles a member deaf or undeaf on voice channels',
      examples: ['toggledeaf @IAm12', 'toggledeaf @IAm12 profanity'],
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
    if (member.serverDeaf) {
      member.setDeaf(false, reason);
      msg.reply(`${member} was undeafened.`);
    } else {
      member.setDeaf(true, reason);
      msg.reply(`${member} was deafened.`);
    }
  }
};
