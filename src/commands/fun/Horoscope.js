const { Command } = require("discord.js-commando");
const fetch = require("node-fetch");
const signs = [
    "capricorn",
    "aquarius",
    "pisces",
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius"
  ];

function UserException(sign){
    this.sign=sign;
    this.name='UserException'
}

function isSign(sign){
    if(signs.filter(e=> sign === e)[0] !== undefined){
        return sign;
    } else {
        throw new UserException('Invalid sign, use: ')
    }
}

module.exports = class Horoscope extends Command {
  constructor(client) {
    super(client, {
      name: "horoscope",
      group: "fun",
      memberName: "horoscope",
      description: "Gets a daily horoscope for your astrological sign.",
      examples: ["horoscope carpircorn"],
      throttling: {
        usages: 1,
        duration: 10
      },
      args: [
        {
          key: "sign",
          prompt: "What is your sign?",
          type: "string"
        }
      ]
    });
  }
  async run(msg, { sign }) {
    let day = "tomorrow";
    let outlook = '';

    try {
        isSign(sign);
        outlook = await fetch(
            `${process.env.HOROSCOPE}?sign=${sign}&day=${day}`,
            {
              method: "POST"
            }
          )
            .then(response => response.json())
            .then(json => {
              return `\n${json.date_range} ${sign} your horoscope for ${
                json.current_date
              } \n${json.description}`;
            });      
    } catch (error) {
        let sign = '';
        signs.forEach(e=> (sign += `${e} `));
        outlook = `Invalid sign, use: ${signs}`;
    }
    return msg.reply(outlook);
  }
};
