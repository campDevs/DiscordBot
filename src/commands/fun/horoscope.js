// @Author Paul Hosler
// required modules for this feature
const {Command} = require('discord.js-commando');
// const fetch = require('node-fetch');
const logger = require('../../utils/logging.js');
const getHoroscope = require('../../utils/getHoroscope.js');

// return a human readable date for today ex. Mon May 7 2018
const readableDate = (date) => {
  let d = new Date(date);
  return d
    .toUTCString()
    .split(' ')
    .filter((d, i) => (i <= 3 ? d : ''))
    .join(' ');
};

module.exports = class Horoscope extends Command {
  constructor(client) {
    super(client, {
      name: 'horoscope',
      group: 'fun',
      memberName: 'horoscope',
      description: 'Gets a daily horoscope for your astrological sign.',
      examples: ['horoscope carpircorn'],
      throttling: {
        usages: 1,
        duration: 10,
      },
      args: [{
        key: 'sign',
        prompt: 'What is your sign?',
        type: 'string',
      }, ],
    });
  }

  async run(msg, {sign}) {
    let outlook = await getHoroscope(sign)
      .then((message) => {
        if (message.error !== undefined) {
          return `I only know these Zodiac symbols: ${message.error}`;
        }
        return `\n:${sign === 'scorpio' ? 'scorpius':sign}: ${message.sign.name} ${message.sign.start} thru ${message.sign.end}\nHoroscope for ${readableDate(message.date)}\n${message.description}`
      })
      .catch((error) => {
        console.error(error);
      });
    return msg.say(outlook);
  }
};
