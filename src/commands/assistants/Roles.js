const {Command} = require('discord.js-commando')
const roles = require('../../selfAssignableRoles.json')

const [RED, GREEN] = [0xff0000, 0x00ff00]

module.exports = class Role extends Command {
  constructor(client) {
    super(client, {
      name: "role",
      group: "assistants",
      memberName: "role",
      description: "(un)assign roles to yourself",
      examples: [
        "role remove USA",
        "role add she/her",
      ],
     args: [
        {
          key: "command",
          prompt: "Do you want to 'add' (or 'a'); or 'remove' (or 'r') the role?",
          type: "string",
          validate: command => ['a', 'add', 'r', 'remove'].includes(command.toLowerCase())
        },
        {
          key: "role",
          prompt: "Which role do you want to add/remove. Contact an admin if your role isn't self-assignable.",
          type: "string"
        }
      ]
   })
  }

  run(msg, {command, role}) {
    const shouldAdd = ['a', 'add'].includes(command.toLowerCase())
    
    // These show feedback messages (success/failiure)
    const good = () => {
      msg.channel.send({
        embed: {
          color: GREEN,
          title: `Role ${shouldAdd ? "added" : "removed"}`
        }
      })
    }
    
    const bad = description => {
      msg.channel.send({
        embed: {
          color: RED,
          title: `Role not ${shouldAdd ? "added" : "removed"}`,
          description
        }
      })
    }
    
    role = role.toLowerCase()
    const targetRole = roles.find(p => p.aliases.includes(role) || p.roleName === role)

    if(targetRole) {
      // Must be a guild, not a DM.
      if(msg.guild) {
        // Check that the role exists in the server (if not, this is a misconfiguration)
        const role = msg.guild.roles.find("name", targetRole.roleName)

        if(role) {
          const rejected = () => {
            console.error("Need server permission to manage roles for `role` command")
            bad("The bot needs extra permissions to manage roles. Contact an admin.") 
          }
          
          if(shouldAdd) {
            msg.member.addRole(role, '[bot] role requested by user').then(good).catch(rejected)
          } else {
            msg.member.removeRole(role, '[bot] role requested by user').then(good).catch(rejected)
          }
        } else {
          console.error("Role '" + targetRole.roleName + "' not found in server")
          bad("The role '" + targetPronoun.roleName + "' doesn't exist in the Discord server, but is in the bot's database. Contact an admin.")
        }
      } else {
        bad("Sorry, I can't set up roles over DM")
      }
    } else {
      bad(`Supported roles:\n${roles.map(r => "- " + r.roleName).join("\n")}\nContact an admin to add your roll.`)
    }
  }
}
