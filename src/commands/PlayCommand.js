const {Command} = require('discord.js-commando')
module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "music",
      memberName: "play",
      description: "plays a video from youtube at the provided full url",
      examples: ["play https://youtu.be/dQw4w9WgXcQ"],
      args: [
        {
          key: "url",
          prompt: "What is the url of the youtube video",
          type: "string"
        }
      ]
    })
  }

  async run(msg, {url}) {
    if (msg.channel.type !== 'text') return
    const { voiceChannel } = msg.member

    if (!voiceChannel) {
        return msg.reply('You must be in a voice channel for me to join.')
    }

    try {
      const connection = await voiceChannel.join()
      const stream = ytdl(encodeURI(url), { filter: 'audioonly'})
      const dispatcher = connection.playStream(stream)
      dispatcher.on('end', () => voiceChannel.leave())
    } catch (error) {
      console.error(error)
    }
  }
}