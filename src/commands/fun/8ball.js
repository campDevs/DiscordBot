const {Command} = require('discord.js-commando')

const comebacks = require("../../utils/8ball.json")

// We must now add a "random" type

comebacks.random = Object.values(comebacks).reduce((a, b) => a.concat(b), [])

console.log("State of COMEBACKS: " + JSON.stringify(comebacks))

const types = Object.keys(comebacks).join(", ")

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = class EightBallCommand extends Command {
  constructor(client) {
    super(client, (console.log(typeof ("Which kind of 8ball? " + types)), {
      name: "8ball",
      group: "fun",
      memberName: "8ball",
      description: "Predicts the future whichever way you want (" + types + ")",
      examples: [
        "8ball Am I a good person?",
        "8ball Will I win $100?" ],
      args: [
        {
          key: "type",
          prompt: "Which kind of 8ball? " + types,
          type: "string",
          validate: type => types.includes(type) || "Please select one of the kinds of 8ball listed... "
        },
        {
          key: "_",
          default: "",
          prompt: "",
          type: "string"
        }
      ]
    }))
  }

  run(msg, {type}) {
    return msg.reply("🎱" + randomElement(comebacks[type]))
  }
}
