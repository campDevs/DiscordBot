const {Command} = require('discord.js-commando')
const pronounRoles = require('../../utils/pronouns.json')

const [RED, GREEN] = [0xff0000, 0x00ff00]

module.exports = class PronounRoles extends Command {
  constructor(client) {
    super(client, {
      name: "pronoun",
      group: "assistants",
      memberName: "pronoun",
      description: "Add a role to let people know of your pronouns",
      examples: [
        "pronoun remove him",
        "pronoun add they",
      ],
     args: [
        {
          key: "command",
          prompt: "Do you want to 'add' (or 'a'); or 'remove' (or 'r') the role?",
          type: "string",
          validate: command => ['a', 'add', 'r', 'remove'].includes(command.toLowerCase())
        },
        {
          key: "pronoun",
          prompt: "Which pronoun do you want to add/remove (e.g., 'they', 'he', 'she'). Contact an admin if your pronouns aren't available.",
          type: "string"
        }
      ]
   })
  }

  run(msg, {command, pronoun}) {
    const shouldAdd = ['a', 'add'].includes(command.toLowerCase())
    
    // These show feedback messages (success/failiure)
    const good = () => {
      msg.channel.send({
        embed: {
          color: GREEN,
          title: `Pronoun role ${shouldAdd ? "added" : "removed"}`
        }
      })
    }
    
    const bad = description => {
      msg.channel.send({
        embed: {
          color: RED,
          title: `Pronoun role not ${shouldAdd ? "added" : "removed"}`,
          description
        }
      })
    }
    
    pronoun = pronoun.toLowerCase()
    const targetPronoun = pronounRoles.find(p => p.aliases.includes(pronoun) || p.roleName === pronoun)

    if(targetPronoun) {
      // Must be a guild, not a DM.
      if(msg.guild) {
        // Check that the role exists in the server (if not, this is a misconfiguration)
        const role = msg.guild.roles.find("name", targetPronoun.roleName)

        if(role) {
          const rejected = () => {
            console.error("Need server permission to manage roles for `permission` command")
            bad("The bot needs extra permissions to manage roles. Contact an admin.") 
          }
          
          if(shouldAdd) {
            msg.member.addRole(role, '[bot] pronoun role requested by user').then(good).catch(rejected)
          } else {
            msg.member.removeRole(role, '[bot] pronoun role requested by user').then(good).catch(rejected)
          }
        } else {
          console.error("Pronoun role '" + targetPronoun.roleName + "' not found in server")
          bad("The role '" + targetPronoun.roleName + "' doesn't exist in the Discord server, but is in the bot's database. Contact an admin.")
        }
      } else {
        bad("Sorry, I can't set up roles over DM")
      }
    } else {
      bad(`Supported pronouns:\n${pronounRoles.map(r => "- " + r.roleName).join("\n")}\nContact an admin to add your pronoun.`)
    }
  }
}
