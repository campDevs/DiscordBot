const {Command} = require('discord.js-commando')
const pronounRoles = require('../../utils/pronouns.json')

const [RED, GREEN] = [0xff0000, 0x00ff00]

function error(where, title, description) {
  where.send({embed: {color: RED, title, description}})
}

function good(where, title, description) {
  where.send({embed: {color: GREEN, title, description}})
}

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
          key: "cmd",
          prompt: "Do you want to 'add' (or 'a'); or 'remove' (or 'r') the role?",
          type: "string",
          validate: command => ['a', 'add', 'r', 'remove'].includes(cmd)
        },
        {
          key: "pronoun",
          prompt: "Which pronoun do you want to add/remove (e.g., 'they', 'he', 'she'). Contact an admin if your pronouns aren't available.",
          type: "string"
        }
      ]
   })
  }

  run(msg, {cmd, pronoun}) {
    // First, try to find the pronoun.
    pronoun = pronoun.toLowerCase()
    const targetPronoun = pronounRoles.find(p => p.aliases.includes(pronoun) || p.roleName === pronoun)

    if(targetPronoun) {
      // Check that this wasn't a DM
      if(msg.guild) {
        // Check that the role exists in the server (if not, this is a misconfiguration)
        const role = msg.guild.roles.find("name", targetPronoun.roleName)

        if(role) {
          msg.member.addRole(role, '[bot] pronoun role requested by user').then(() => {
            good(msg.channel, "Role added")
          }).catch(e => {
            console.error("Attempted to add pronoun role, but didn't have permission")
            error(msg.channel, "Role not added", "The bot needs extra permissions to manage roles")
          })
        } else {
          console.error("Attempted to add pronoun role '" + targetPronoun.roleName + "', but no such role was found in the server.")
          error(msg.channel, "Role not added", "Due to a misconfiguration in the server, the role doesn't exist yet. An admin should add it ('" + targetPronoun.roleName + "')")
        }
      } else {
        error(msg.channel, "Role not added", "Sorry, I can't set up roles over DM")
      }
    } else {
      error(msg.channel, "Pronoun not supported", "Supported pronouns: " + pronounRoles.map(p => p.roleName).join(", ") + ". Ask an admin to add your pronoun.")
    }
  }
}
