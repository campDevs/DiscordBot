const {Command} = require('discord.js-commando')
const cheerio = require('cheerio')
const fetch = require("node-fetch")


module.exports = class FCCCommand extends Command {
  constructor(client) {
    super(client, {
      name: "fccc",
      group: "scrapers",
      memberName: "fccc",
      description: "Scraps fcc challenge descriptions",
      examples: ["fccc https://www.freecodecamp.org/challenges/add-two-numbers-with-javascript"],
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "url",
          prompt: "What fcc challenge do you want the description for?",
          type: "string"
        }
      ]
    })
  }

  // hasPermission(msg) {
  //   return this.client.isOwner(msg.author)
  // }

  async run(msg, {url}) {
    let challengeTitle = ""
    let challengeDescription = ""
    let navLogoUrl = ""
    try {
      const res = await fetch(url)
      const text = await res.text()
      const $ = cheerio.load(text)
      navLogoUrl = $(".nav-logo").attr("src")
      challengeTitle = $(".challenge-instructions-title").text()
      challengeDescription =  $(".challenge-instructions").text()
    } catch(error) {
      console.error(error)
    }
    return msg.replyEmbed(
      {
        title: challengeTitle,
        description: challengeDescription,
        url: url,
        color: 0x1e701e,
        image: {
          url: navLogoUrl
        }
      }
    )
  }
}