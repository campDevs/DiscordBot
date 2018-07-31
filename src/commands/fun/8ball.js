const {Command} = require('discord.js-commando')

const EIGHTBALL = "\ud83c\udfb1"

const comebacks = require("../../utils/8ball.json")

// We must now add a "random" type

comebacks.random = Object.values(comebacks).reduce((a, b) => a.concat(b), [])

const rawTypes = Object.keys(comebacks)
const types = rawTypes.join(", ")

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = class EightBallCommand extends Command {
  constructor(client) {
    super(client, {
      name: "8ball",
      group: "fun",
      memberName: "8ball",
      description: "Predicts the future with responses of several different styles: " + types,
      examples: [
        "8ball classic Am I a good person?",
        "8ball random Will I win $100?" ],
      args: [
        {
          key: "type",
          prompt: "Which kind of 8ball? " + types,
          type: "string",
          validate: type => rawTypes.includes(type) || "Please select one of the kinds of 8ball listed: " + types
        },
        {
          key: "question",
          default: "",
          prompt: "",
          type: "string"
        }
      ]
    })
  }

  run(msg, {type}) {
    return msg.channel.send(EIGHTBALL + randomElement(comebacks[type]))
  }
}
