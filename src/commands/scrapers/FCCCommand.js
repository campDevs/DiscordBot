const { Command } = require('discord.js-commando')
const fetch = require("node-fetch")
const file = require('fs')

module.exports = class FCCCommand extends Command {
  constructor(client) {
    super(client, {
      name: "fccc",
      group: "scrapers",
      memberName: "fccc",
      description: "Scrapes fcc challenge descriptions",
      examples: ["fccc add two numbers with javascript"],
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "challengeName",
          prompt: "What fcc challenge do you want the description for?",
          type: "string"
        }
      ]
    })
  }

  // hasPermission(msg) {
  //   return this.client.isOwner(msg.author)
  // }

  async run(msg, { challengeName }) {
    let defaultMessage = {
      title: ':(',
      description: `Unable to find a matching challenge with ${challengeName}`,
      url: 'https://www.freecodecamp.org/'
    }

    const { title, description, url } = findChallenge(challengeName.trim().toLowerCase()) || defaultMessage

    return msg.replyEmbed(
      {
        title,
        description,
        url
        // color: 0x1e701e,
        // image: {
        //   url: navLogoUrl
        // }
      }
    )
  }
}

function decodeHTMLEntities(text) {
  const map = {
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"'
  }
  return text.replace(/(&[^&;]+;)/g, a => map[a])
}

function removeHTMLTags(textArray) {
  return textArray
    .filter(a => !/^<hr>$/.test(a))

    // double newlines, while not perfect for all situations, is better than not having them at all
    .join('\n\n')

    // transform some html tags to markdown
    .replace(/<code>|<\/code>/g, '`')
    .replace(/<blockquote>|<\/blockquote>/g, '```')
    .replace(/<b>|<\/b>|<strong>|<\/strong>/g, '**')
    .replace(/<i>|<\/i>|<em>|<\/em>|<dfn>|<\/dfn>/g, '*')
    .replace(/<br>/g, '\n')

    // remove any remaining html tags
    .replace(/<[^<>]+>/g, '')
}

function sanitizeChallengeDescription(desc) {
  return decodeHTMLEntities(removeHTMLTags(desc))
}

function getMajorCategory(category) {
  // needed for getting major categories for the fcc url
  const githubEndpoints = JSON.parse(file.readFileSync('src/commands/scrapers/data/fcc/githubEndpoints.json'))

  for (let majorCategory in githubEndpoints) {
    for (let minorCategory of githubEndpoints[majorCategory]) {
      const transformedCategory = category.toLowerCase().replace(/\s/g, '-')
      if (transformedCategory === minorCategory) {
        return majorCategory.replace(/^\d{2}-/, '')
      }
    }
  }

  // should never get here
  return null
}

function findChallenge(name) {
  const fccURI = 'https://learn.freecodecamp.org'
  const challengeData = JSON.parse(file.readFileSync('src/commands/scrapers/data/fcc/challengeData.json'))

  let possibleWordResults = []

  for (let minorCategory of challengeData) {
    const majorCategory = getMajorCategory(minorCategory.name)
    for (let challenge of minorCategory.challenges) {
      const title = challenge.title.toLowerCase().trim().replace(/\"/g, '')
      const titleWords = title.split` `
      const nameWords = name.split` `

      if (nameWords.some(nameWord => title.match(nameWord))) {
        possibleWordResults.push({
          title: challenge.title,
          description: sanitizeChallengeDescription(challenge.description),
          url: `${fccURI}/${majorCategory}/${minorCategory.name.toLowerCase().replace(/\s/g, '-')}/${title.replace(/\s/g, '-')}`,
          nMatchedWords: nameWords.reduce((a, b) => titleWords.includes(b) ? a + 1 : a, 0)
        })
      }
    }
  }

  if (possibleWordResults.length === 0) {
    return false
  } else if (possibleWordResults.length === 1) {
    return possibleWordResults[0]
  } else {
    return possibleWordResults.reduce((a, b) => b.nMatchedWords > a.nMatchedWords ? b : a)
  }
}
