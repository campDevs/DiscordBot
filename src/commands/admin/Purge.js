const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'purge',
      group: 'admin',
      memberName: 'purge',
      description:
        'Filters through set number of messages (default: 10) removing the messages from a single user',
      examples: ['purge @odyn 10 spam', 'purge @Bryan 100'],
      args: [
        {
          key: 'member',
          prompt: 'Who do you want to purge?',
          type: 'member',
        },
        {
          key: 'num_messages',
          prompt: 'How many messages do you want to filter through?',
          type: 'integer',
          default: 10,
        },
        {
          key: 'reason',
          prompt: 'Why do you want to purge them?',
          type: 'string',
          default: "'None provided'",
        },
      ],
      clientPermissions: ['MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
    });
  }

  async run(msg, { member, num_messages, reason }) {
    let messages = await msg.channel.messages.fetch({ limit: num_messages });
    messages = messages.filter((msg) => msg.author.id === member.id);
    msg.channel.bulkDelete(messages);
  }
};
