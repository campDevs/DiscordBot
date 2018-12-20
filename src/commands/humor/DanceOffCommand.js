const { Command } = require('discord.js-commando');

module.exports = class DanceOffCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'danceoff',
      group: 'humor',
      memberName: 'danceoff',
      description: 'Dance-off',
    });
  }

  run(msg) {
    return msg.embed({
      title: 'Robot Danceoff',
      color: 0xf442ce,
      author: {
        name: this.client.user.username,
        icon_url: this.client.user.avatarURL,
      },
      image: {
        url: 'http://i.imgur.com/wDgO8up.gif',
      },
    });
  }
};
