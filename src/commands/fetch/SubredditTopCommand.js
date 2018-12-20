const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class SubredditTopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'reddit',
      group: 'fetch',
      memberName: 'reddit',
      description: 'Pulls top posts from reddit',
      examples: [
        'reddit javascript top hour 5',
        'reddit news hot hour 3',
        'reddit javascript rising week 10',
      ],
      throttling: {
        usages: 1,
        duration: 10,
      },
      args: [
        {
          key: 'subreddit',
          prompt: 'What subreddit do you want the top posts for?',
          type: 'string',
        },
        {
          key: 'list',
          prompt:
            'Do you want to list hot, new, rising, controversial, or top?',
          type: 'string',
          validate: (str) =>
            ['hot', 'new', 'top', 'controversial', 'rising'].includes(str),
        },
        {
          key: 'limit',
          prompt: 'Top how many?',
          type: 'integer',
          max: 10,
          min: 1,
        },
        {
          key: 'time',
          prompt:
            'For what timeframe do you want the top posts for? (hour, day, week, month, year, all)',
          type: 'string',
          validate: (str) =>
            ['hour', 'day', 'week', 'month', 'year', 'all'].includes(str),
        },
      ],
    });
  }

  async run(msg, { subreddit, list, time, limit }) {
    let posts = null;
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${encodeURIComponent(
          subreddit
        )}/${list}.json?t=${time}&limit=${limit}`
      );
      const text = await res.text();
      posts = JSON.parse(text).data.children;
    } catch (error) {
      console.error(error);
    }
    const listTitle = list[0].toUpperCase() + list.slice(1);
    const subredditTitle = subreddit[0].toUpperCase() + subreddit.slice(1);
    const embed = new MessageEmbed()
      .setTitle(`${subredditTitle} Posts`)
      .setThumbnail(
        'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Reddit_logo_and_wordmark.svg/250px-Reddit_logo_and_wordmark.svg.png'
      )
      .setAuthor('Reddit')
      .setFooter(
        `List requested by ${msg.author.username}`,
        msg.author.defaultAvatar
      )
      .setDescription(`${listTitle} ${limit} posts`)
      .setColor('FF2A08');
    posts.forEach(({ data }) => {
      embed.addField(
        `**${decodeURIComponent(data.title)}**`,
        `Score: ${data.score}  Author: ${
          data.author
        } Link: https://www.reddit.com${data.permalink}`
      );
    });
    return msg.replyEmbed(embed);
  }
};
