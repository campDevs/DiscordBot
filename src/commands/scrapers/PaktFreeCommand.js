const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

const cheerio = require('cheerio');
const fetch = require('node-fetch');
const logger = require('../../utils/logging');

module.exports = class PaktFreeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'paktfree',
      group: 'scrapers',
      memberName: 'paktfree',
      description:
        'Scrapes and embeds data on current Pakt Free Book of the Day',
      examples: ['paktfree'],
      throttling: {
        usages: 1,
        duration: 10,
      },
    });
  }

  async run(msg) {
    try {
      const res = await fetch(
        'https://www.packtpub.com/packt/offers/free-learning'
      );
      const text = await res.text();
      const $ = cheerio.load(text);

      const bookTitle = $('.dotd-title > h2')
        .html()
        .trim();
      const bookImage = $('.dotd-main-book-image noscript')
        .html()
        .trim();
      const bookImageURL = $(bookImage).attr('src');
      const bookSummary = $('.dotd-title')
        .next()
        .next()
        .html()
        .trim();

      const bulletItems = $('.dotd-main-book-summary ul')
        .html()
        .replace(new RegExp('<li>', 'g'), '-')
        .replace(new RegExp('</li>', 'g'), '\n');

      return msg.embed({
        title: `Pakt Free Book of the Day: ${bookTitle}`,
        description: `${bookSummary} \n ${bulletItems}`,
        url: 'https://www.packtpub.com/packt/offers/free-learning',
        color: 0x1e701e,
        image: {
          url: bookImageURL,
        },
      });
    } catch (error) {
      logger.error(error);
    }
  }
};
