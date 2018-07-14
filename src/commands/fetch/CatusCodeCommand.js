const {Command} = require('discord.js-commando')
const fetch = require("node-fetch")
const {MessageEmbed} = require('discord.js')


module.exports = class CatusCodeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "catuscode",
      group: "fetch",
      memberName: "catuscode",
      description: "Loads a cat-related picture demonstrating various HTTP status codes",
      examples: ['catuscode 500', 'catuscode 301'],
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "statusCode",
          prompt: "What status code are you looking for?",
          type: "integer"
        },
      ]
    })
  }

  async run(msg, {statusCode}) {
    let referenceUrl = 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/'
    let outboundMessage = ''

    try {
      const status_codes = [
        100, 101, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304, 305,
        306, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411, 412,
        413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426,
        429, 431, 444, 450, 500, 502, 503, 504, 506, 507, 508, 509, 510, 511, 
        599
      ]

      if(status_codes.includes(statusCode)) {
        msg.say(`https://http.cat/${statusCode}`)
        msg.say(`For more information, see: <${referenceUrl}${statusCode}>`)
      } else {
        msg.say('Sorry, the cats of the HTTP underworld don\'t recognize that code.')
      }
    } catch(error) {
      console.error(error)
    }	 
  }
}
