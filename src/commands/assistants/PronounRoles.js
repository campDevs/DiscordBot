const {Command} = require('discord.js-commando')
const pronounRoles = require('../../utils/pronouns.json')

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
          validate: cmd => ['a', 'add', 'r', 'remove'].includes(cmd)
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
          msg.member.addRole(role, '[bot] pronoun role requested by user').then(() => console.log('added')).catch(e => console.error('whoops', e))
          msg.channel.send("Role added!")
        } else {
          console.error("Attempted to add pronoun role '" + targetPronoun.roleName + "', but no such role was found in the server.")
          msg.channel.send("Sorry, due to a misconfiguration in this server, there isn't a role which I can assign. An admin needs to create one.")
        }
      } else {
        msg.channel.send("Sorry, I can't set pronoun roles up for your over DM")
      }
    } else {
      msg.channel.send("That pronoun doesn't exist. Supported pronouns: " + pronounRoles.map(p => p.roleName).join(", ") + ". Ask an admin to add your pronoun.")
    }
  }
}
