# Available DiscordBot Commands

***The list of custom commands are in the order they appear in the source.***

### Current Commands  
### commandojs built in commands
+  **Utilities**
   +  [help](#help)
   +  [ping](#ping)
   +  [prefix](#prefix)
   +  [eval](#eval)
+  **Command state (commands)**
   +  [enable](#enable)
   +  [disable](#disable)
   +  [reload](#reload)
   +  [load](#load)
   +  [unload](#unload)
   +  [groups](#groups)  
###  Custom Commands
+  **assistants**
   +  [lmgtfy](#lmgtfy)
+  **code**
   +  [format](#format)
+  **fetch**
   +  [catuscode](#catuscode)
   +  [reddit](#reddit)
+  **fun**
   +  [horoscope](#horoscope)
+  **humor**
   +  [brick](#brick)
   +  [danceoff](#danceoff)
   +  [rickroll](#rickroll)
+  **music**
   +  [play](#play)
+  **scrapers**
   +  [fccc](#fccc)
   +  [mdn](#mdn)
   +  [phpdoc](#phpdoc)

### help  
Description: If no arguments are specified, the command displays a list of all commands available in the current context. In order for a command to be displayed, it must be enabled in the guild (or global), and the user must have permission to use it. Passing the all argument will list all commands, regardless of context. Passing anything else will search for any commands that match, and display detailed information if only one is found.

_examples_
+   help
+   help eval
### ping  
Description: The ping command will send a message, then edit it to contain the amount of time it took. It also displays the client's heartbeat ping.

_examples_
+  ping
### prefix  
Description: This command, if not provided with any arguments, will display the current command prefix, and how to use commands. If the command is used in a guild channel and an argument is specified, it will set the command prefix for the guild if the user is a guild admin, or the bot owner, If the command is used in a DM and an argument is specified, it will set the global default command prefix if the user is the bot owner.

_examples_
+  prefix
+  prefix %
### eval  
Description: The eval command will allow the bot owner to evaluate any JavaScript code, and display its result. It will automatically hide the bot's token/email/password in the output. Caution should still be taken, however, as you could potentially break your running bot with it.

In the script, this will refer to the Command instance. There are several shortcut variables and helpers that are also available:

_examples_  

| Name | Type | Description |
| --- | --- | --- |
| message, msg | Variable | The message that triggered the command |
| client | Variable | Shortcut to this.client |
| objects | Variable | Shortcut to this.client.registry.evalObjects |
| lastResult | Variable | Shortcut to this.lastResult (the previous eval result value) |
| doReply(val) | Function | Sends another detailed message with any value to display. Useful for callbacks. |  
### enable  
Description: Enables a command/group in the current guild if the user is an admin or the bot owner. If used in a DM, enables the command/group globally by default if the user is the bot owner.

_examples_
+  enable brick  
### disable  
Description: Disables a command/group in the current guild if the user is an admin or the bot owner. If used in a DM, disables the command/group globally by default if the user is the bot owner.

_examples_
+  disable brick  
### reload  
Description: Reloads a command, or all commands in a group, if the user is the bot owner.

_examples_
+  reload
+  reload brick
### load  
Description: Loads a command if the user is the bot owner. The command must be specified as the full name (group:memberName). Built-in commands cannot be loaded.

_examples_
+  load brick  
### unload  
Description: Unloads a command if the user is the bot owner. Built-in commands cannot be unloaded.

_examples_
+  unload brick  
### groups  
Description: Lists all command groups if the user is an admin of the current guild, or the bot owner.

_examples_
+  groups  

***Custom Commands***
### lmgtfy  
Description: let me google that for you - Google for slow people  

_examples_
+   lmgtfy js vs python  
+   lmgtfy How do I google something?  

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/assistants/LmgtfyCommand.js)  
### format   
Description: Formats code in the provided language  

_examples_
+  format js console.log("hello world!");
+  format go fmt.Println("Hello World!")

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/code/FormatCommand.js)  
### catuscode  
Description: Loads a cat-related picture demonstrating various HTTP status codes  

_examples_
+  catuscode 500
+  catuscode 301

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/fetch/CatusCodeCommand.js)  
### reddit  
Description: Pulls top posts from reddit

_examples_
+  reddit news hot hour 3
+  reddit javascript rising week 10

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/fetch/SubredditTopCommand.js)  
### horoscope  
Description: Gets a daily horoscope for your astrological sign  

_examples_
+  horoscope capricorn

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/fun/horoscope.js)  
### brick  
Description: Brick screaming

_examples_
+  brick

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/humor/BrickCommand.js)  
### danceoff  
Description: Dance-off

_examples_
+  danceoff

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/humor/DanceOffCommand.js)  
### rickroll  
Description: Rick Astley - Never Gonna Give You Up command

_examples_
+  rickroll

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/humor/RickRollCommand.js)  
### play  
Description: plays a video from youtube at the provided full url  

_examples_
+  play https://youtu.be/dQw4w9WgXcQ

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/music/PlayCommand.js)  
### fccc  
Description Scraps fcc challenge descriptions  

_examples_
+  fccc https://www.freecodecamp.org/challenges/add-two-numbers-with-javascript

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/scrapers/FCCCommand.js)  
### mdn  
Description: Loads documentation from Mozilla Developer Network based on keywords

_examples_
+  mdn array slice

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/scrapers/MDNCommand.js)  
### phpdoc  
description: Loads documentation from PHP.net based on keywords

_examples_
+  phpdoc strlen

[Source](https://github.com/campDevs/DiscordBot/blob/master/src/commands/scrapers/PHPDocCommand.js)  


[ 🔙to top ](#available-discordbot-commands)  
