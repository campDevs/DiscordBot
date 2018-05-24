/*
Copyright (c) 2018 Paul Hosler

The MIT License (MIT)
copyright © 2015 <copyright holders>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the “Software”), to deal in the Software without restriction, including without 
limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, subject to the following
conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT 
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN 
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE 
OR OTHER DEALINGS IN THE SOFTWARE.

https://opensource.org/licenses/MIT
*/


// required modules for this feature
const {
  Command
} = require('discord.js-commando');
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

  async run(msg, {
    sign
  }) {
    // fetch(`https://confused-closet.glitch.me/api?sign=${sign}`)
    //   .then((res) => res.text())
    //   .then((body) => body)
    //   .then(JSON.parse)
    //   .then((message) => {
    //     if (message.error !== undefined) {
    //       return msg.say(`I only know these Zodiac symbols: ${message.error}`);
    //     }
    //     return msg.say(
    //       `\n${message.sign.name} ${message.sign.start} thru ${
    //         message.sign.end
    //       }\nHoroscope for ${readableDate(message.date)}\n${
    //         message.description
    //       }`
    //     );
    //   })
    //   .catch((error) => {
    //     logger.error(error);
    //   });
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