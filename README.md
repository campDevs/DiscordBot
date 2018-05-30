# Discord Bot

> self-hosted modular bot

This project's goal is to make a full featured, modular, self-hosted bot in javascript.

[![Known Vulnerabilities](https://snyk.io/test/github/campdevs/discordbot/badge.svg?targetFile=package.json)](https://snyk.io/test/github/campdevs/discordbot?targetFile=package.json)

## Getting up and running
1. Clone this repo
2. `npm install`
3. Create a `.env` file to store your super secret bot token:
```
TOKEN=<Bot Token>
```
4. (Optional) configure the bot to use a prefix (default prefix is `+`) of your choice by creating a file `config.json` in the root of the bot:
```json
{ "prefix": ">" }
```
5. `npm start`

## Configuration
### Owners
To set the bot owners add an `"owners"` property to the config file and add the owner ids:
```json
{
  "prefix": ">",
  "owners": ["1234567891234"]
}
```

## Helpful links
Below are some helpful links that can help you with the production of a bot

* [Discord.js Docs](https://discord.js.org/#/docs/main/stable/general/welcome)
* [Discord.js Guide](https://anidiotsguide_old.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version.html)
* [Discord.js Commando Guide](https://dragonfire535.gitbooks.io/discord-js-commando-beginners-guide/content/)


## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for details

## Deployment
TODO 

## Contributors

[Contributors](https://github.com/campDevs/DiscordBot/contributors)

## License

[MIT](LICENSE.md)
