# Contributing

## Prerequisites

* [Get your bot token](#prerequisites:-get-your-bot-token)
* [Get your user id](#prerequisites:-get-your-user-id)
* [Get an invitation link](#prerequisites:-get-an-invitation-link)


## Getting up and running
* Clone this repo
* `npm install`
* Create a `.env` file with the following line:
```
TOKEN=<Bot Token>
```
* Replace `<Bot Token>` with your bot token acquired in the prerequisite step "Get your bot token."

* Enter the `src` directory and start the CLI, and then fill in any details. Hit enter for any question to use the default value. To set yourself as the owner of the bot, you'll need to know your user ID -- see the prerequisite step "Get your uuser id"

```bash
cd src
node setup
```

* `npm start`

## Helpful links
Below are some helpful links that can help you with the production of a bot:
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

## Prerequisites: Get your bot token
  
- A bot token is a string used by the Discord API to authenticate users and bots.

> 1. Visit [Discord Devolopers page](https://discordapp.com/developers/applications/) while logged in.
> 2. Click "Create an application". <div><img alt="'Create an Application' button image" src="https://cdn.discordapp.com/attachments/430070805653880832/473150670804090883/unknown.png"></div>
> 3. Fill in the relevant information (i.e. title, description). You can optionally add an icon. This can be changed later.
> 4. Open the "Bot" tab. <div><img alt="Navigation menu with 'Bot' tab selected" src="https://cdn.discordapp.com/attachments/430070805653880832/473151943162724382/unknown.png"></div>
> 5. Click "Add Bot" to create a bot user. Change the username or icon as desired.
> 6. In the Token section click the "Copy" button. <div><img alt="Token section" src="https://cdn.discordapp.com/attachments/430070805653880832/473152233916203028/unknown.png"></div>
> 7. This is your bot token. **Keep it secret**, as people who know it can take control of your bot.

## Prerequisites: Get your user ID

- The user id is a numerical [snowflake](https://discordapp.com/developers/docs/reference#snowflakes) id used by the Discord API to identify who is responsible for maintaining the bot. [Follow these directions to get your user id](https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-).


## Prerequisites: Get an invitation link
- The invitation link for your bot is used to invite it to servers.

> 1. Select your bot at the [Discord Devolopers page](https://discordapp.com/developers/applications/).
> 2. Open the "OAuth" tab. <div><img alt="Navigation menu with OAuth tab selected" src="https://cdn.discordapp.com/attachments/430070805653880832/473153670717112321/unknown.png"></div>
> 3. Tick "Bot" as the only scope your bot needs. <div><img alt="Menu to select scopes with only Bot selected" src="https://cdn.discordapp.com/attachments/430070805653880832/473153767886553118/unknown.png"></div>
> 4. If you have a discord server, paste the link in your browser and choose a server, or [create your own discord server!](https://support.discordapp.com/hc/en-us/articles/204849977-How-do-I-create-a-server-) Otherwise, send the generated link to someone who has permission to add bots to the server of your choosing. <div><img alt="Example of a generated invitation link" src="https://cdn.discordapp.com/attachments/430070805653880832/473153996778110976/unknown.png"></div>
