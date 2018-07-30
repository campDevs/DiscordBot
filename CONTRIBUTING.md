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

Find out how to [find your bot token and owner user id, as well as inviting your bot to a server](#getting-your-bot-token-and-user-id)


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

## Getting your bot token and user ID

- A bot token is a string used by the Discord API to authenticate users and bots. [Find out how to get it](#getting-your-bot-token)

- The `owner_id` field in the environment file is to identify who is responsible for maintaining the bot. It is a numerical "snowflake" ID used by the Discord API. [Find out how to get it](#getting-your-user-id)

- The invitation link for your bot is used to invite it to servers. [Find out how to get it](#getting-an-invitation-link)
## Getting your bot token

If you haven't created a bot application yet, do so now:

> - If you haven't yet, navigate to the [Discord Devolopers page](https://discordapp.com/developers/applications/) while logged in
> - Hit "Create an Application <div><img alt="'Create an Application' button image" src="https://cdn.discordapp.com/attachments/430070805653880832/473150670804090883/unknown.png"></div>
> - Fill in the relevant information (i.e. title, description). You can optionally add an icon. This can be changed later.

Next, follow these steps

1. Select your bot at the [Discord Devolopers page](https://discordapp.com/developers/applications/) if it isn't already selected
2. Open the "Bot" tab <div><img alt="Navigation menu with 'Bot' tab selected" src="https://cdn.discordapp.com/attachments/430070805653880832/473151943162724382/unknown.png"></div>
3. Hit "Add Bot" to create a bot user (if you haven't made a bot user yet). Tweak the username or icon if you want.
4. Click to reveal the token, or hit the "Copy" button, in the Token section <div><img alt="Token section" src="https://cdn.discordapp.com/attachments/430070805653880832/473152233916203028/unknown.png"></div>

This is your bot token. **Keep it secret**, as people who know it can take control of your bot.

## Getting your user ID

1. Go to your user account settings<div><img alt="Account settings button" src="https://cdn.discordapp.com/attachments/430070805653880832/473152689526800384/unknown.png"></div>
2. Visit the "Appearance" tab
3. Check the "Developer Mode" option
4. Find a chat message by you (assuming you wish to be marked as the owner of the bot)
5. Right click the username
6. Select "Copy ID"

The numeric user ID of that user will have been copied to your clipboard.

## Getting an invitation link

If you haven't created a bot application yet, do so now:

> - If you haven't yet, navigate to the [Discord Devolopers page](https://discordapp.com/developers/applications/) while logged in
> - Hit "Create an Application" <div><img alt="'Create an Application' button image" src="https://cdn.discordapp.com/attachments/430070805653880832/473150670804090883/unknown.png"></div>
> - Fill in the relevant information (i.e. title, description). You can optionally add an icon. This can be changed later.

Next, follow these steps

1. Select your bot at the [Discord Devolopers page](https://discordapp.com/developers/applications/) if it isn't already selected
2. Open the "OAuth" tab <div><img alt="Navigation menu with OAuth tab selected" src="https://cdn.discordapp.com/attachments/430070805653880832/473153670717112321/unknown.png"></div>
3. Tick "Bot" as the only scope your bot needs <div><img alt="Menu to select scopes with only Bot selected" src="https://cdn.discordapp.com/attachments/430070805653880832/473153767886553118/unknown.png"></div>
4. Send the generated link to someone who has permission to add bots to the server of your choosing <div><img alt="Example of a generated invitation link" src="https://cdn.discordapp.com/attachments/430070805653880832/473153996778110976/unknown.png"></div>