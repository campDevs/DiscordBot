# Available DiscordBot Commands

The following list of commands are in the order they appear in the source.

### Current Commands
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
Description: Loads an cat-related picture demonstrating various HTTP status codes  

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
