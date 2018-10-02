const {Command} = require('discord.js-commando')

let currentStatusText = 'Running in %count% guilds';

module.exports = class SetNowPlaying extends Command {
  constructor(client) {
    super(client, {
      name: "status",
      group: "admin",
      memberName: "status",
      description: "Set the bot's status ('now playing') field",
      examples: [
        "status Being a cool bot",
        "status Participating in %count% servers"
      ],
      args: [
        {
          key: "statusText",
          prompt: "What should this bot's status be?",
          type: "string",
        }
      ],
      userPermissions: ["MANAGE_NICKNAMES"]
    })

    const onGuildCountChange = () => {
      const specialForms = {
        count: client.guilds.size
      }

      let text = currentStatusText

      Object.keys(specialForms).forEach(specialForm => {
        text = replace(text, specialForm, specialForms[specialForm])
      })

      client.user.setActivity(text)
    }

    client.on('ready', onGuildCountChange)
    client.on('guildCreate', onGuildCountChange)
    client.on('guildDelete', onGuildCountChange)
    client.on('nowPlayingShouldChange', onGuildCountChange) // internal
  }

  run(msg, {statusText}) {
    currentStatusText = statusText
    msg.client.emit('nowPlayingShouldChange')
  }
}

/**
 * Replaces a special form like %count% inside a string
 * into its actual value, even if it appears multiple times.
 * Only supports special forms containing just alphabetical chars.
 *
 * @param {string} source - The source text
 * @param {string} query - The name of the special form, w/o the percents
 * @param {string} replacement - The live value that should be used as the replacement
 * @return {string} The string, after the replacement has occured. Does not mutate the original.
 */
function replace(source, query, replacement) {
  query = '%' + query.replace(/[^a-zA-Z]/g, '') + '%'
  return source.replace(new RegExp(query, 'g'), replacement)
}
