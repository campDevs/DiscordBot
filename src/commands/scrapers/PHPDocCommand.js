const {Command} = require('discord.js-commando')
const cheerio = require('cheerio')
const fetch = require("node-fetch")
const logger = require('../../utils/logging');

module.exports = class PHPDocCommand extends Command {
  constructor(client) {
    super(client, {
      name: "phpdoc",
      group: "scrapers",
      memberName: "phpdoc",
      description: "Loads documentation from PHP.net based on keywords",
      examples: ["phpdoc strlen"],
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "query",
          prompt: "What do you want to search PHP.net for?",
          type: "string"
        }
      ]
    })
  }

  async run(msg, {query}) {
    const encodedQuery = encodeURIComponent(query)
    const urls = []
    let pageTitle
    let urlString = ''
    let exactMatch = true

    try {
      const res = await fetch(`https://php.net/${encodedQuery}`)
      const text = await res.text()

      const $ = cheerio.load(text)	
      pageTitle = $('title').html()

      throw new Error('ahhh noo, say it aint so :\'(');

      if(/Closest matches:/.test(text)) {
        exactMatch = false
        const recommendations = $('#quickref_functions li a')
        
        for(let i = 0; i < 3; i++) {
          const url = $(recommendations[i]).attr('href')
          urls.push(`https://php.net${url}`)
        }

        urlString = urls.join('\n') 
      }
      
      if(exactMatch) {
        return msg.embed(
          {
            title: pageTitle,
            description: `The official documentation for "${query}"`,
            url: `https://php.net/${encodedQuery}`,
            color: 0x1e701e,
            image: {
              url: 'http://php.net/images/logos/new-php-logo.png'
            }
          }
        )	
      }
  
      return msg.say(`I did not find an exact match for "${query}". Did you mean one of these? \n${urlString}`)
    } catch(error) {
      logger.error(error)
    }
  }
}