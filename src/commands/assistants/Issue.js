const {Command} = require('discord.js-commando')

module.exports = class IssueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "issue",
	  aliases: ["bug", "request"],
      group: "assistants",
      memberName: "issue",
      description: "Link to report bugs and request features about the bot.",
      examples: [
        "issue",
        "issue Title of my issue",
		"issue Title of my issue // Description of my issue"],
      args: [
        {
          key: "content",
          prompt: "",
          type: "string",
		  default: "",
        }
      ]
    })
  }

  run(msg, {content}) {
    const [title, body] = content.split("//").map(s => s.trim()).concat("", "")
	return msg.channel.send({
		embed: {
			title: "CLICK HERE to File an issue (for bugs and feature requests about this bot) on GitHub",
			description: title ? "The content you specified will be prefilled" : "",
			url: "https://github.com/campDevs/DiscordBot/issues/new/" + (title && `?title=${encodeURIComponent(title)}`) + (body && `&body=${encodeURIComponent(body)}`),
			footer: {"text": "Making GitHub issues requires a free account."}
		}
	})
  }
}
