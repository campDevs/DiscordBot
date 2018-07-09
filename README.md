# Discord Bot

> self-hosted modular bot

[![Known Vulnerabilities](https://snyk.io/test/github/campdevs/discordbot/badge.svg?targetFile=package.json)](https://snyk.io/test/github/campdevs/discordbot?targetFile=package.json) [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/https://github.com/campDevs/DiscordBot/)

This project is a full featured, modular, JavaScript discord bot for freeCodeCamp's unnofficial Discord chat. 

## What is this, exactly?

There exists [freeCodeCamp](https://freecodecamp.org), a site to assist people in learning website development through a series of educational challenges. Then there exists an [unofficial chat](https://discord.gg/EHueREz) to discuss that site. Finally, this repository hosts an autonomous bot for that chat for that site in order to provide useful functionality to both moderators and regular passers-by.

That's *why* this code exists. It's a bot, for a Discord server, and you can use it for your Discord server too! _tada_

- "admin" commands can kick and ban users; as well as delete messages. But the bot also **passively monitors** administrator actions -- all kicks and bans (even ones that don't go through the bot) are logged publicly.
- There is certain functionality specific to freeCodeCamp, like a scraper for challenges
- There are certain commands for assisting in performing certain tasks one might find themselves performing often enough on the server (formats your code for you in the chat, links you to this repository)
- Additionally, there are many "fun" commands, such as a horoscope reader

### Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for details on setup and contributing. 

Thanks to [all of our Contributors](https://github.com/campDevs/DiscordBot/contributors) for helping to develop this bot.



## Deployment
### Glitch.com
Click [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/https://github.com/campDevs/DiscordBot/) and add your bot's token to the `.env` file as `TOKEN=<Bot Token>`. Additionally you can add your discord id as an owner `OWNER_ID=<Discord User ID>`.

Note that glitch.com will sleep after inactivity and your bot will stop responding. You can reawaken your bot by visiting it on glitch.com.

## License

This repository is licensed under the [MIT License](https://github.com/campDevs/DiscordBot/blob/master/LICENSE). Copyright (c) 2018 campDevs Team & Contributors.
