# Contributing

## Getting up and running
1. Clone this repo
2. `npm install`
3. Create a `.env` file with:
```
TOKEN=<Bot Token>
OWNER_ID=<Bot owner id>
```
4. `npm start`

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

## Issues 
When making an issue include the problem you are having/what feature should be added so that people can easily understand the issue from the title and description. 

### Prefixes
When adding an issue add a prefix to the title to help contributers understand what type of issue it is. 

For example, 
  + Important!
  + Feature
  + News
  + Bugs
  + etc.

This will help keep the issue section stay organized and help contributors understand all the problems. 
