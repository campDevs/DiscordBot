// @Author Paul Hosler
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const SIGNS = [
  'capricorn',
  'aquarius',
  'pisces',
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
];

// http://astrology.kudosmedia.net requires a header to access the pages
const Options = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML,' +
      ' like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25',
  },
};

// Useful functions that return a value

// return an array of URLs containing each horoscope
const urlArray = () =>
  SIGNS.map(
    (sign) => `http://astrology.kudosmedia.net/index.php/m/${sign}?day=today`
  );

// return todays date as ex. 2018-5-8
const today = () => new Date(Date.now()).toISOString().split('T')[0];

// check for valid sign request
const isSign = (sign) => SIGNS.includes(sign.toLowerCase());

// Promise block - read and return the horoscope.json file
const getZodiac = () =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, 'horoscope.json'),
      'utf8',
      (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      }
    );
  });

// async function to write stringified JSON to horoscope.json
function writeJSON(data) {
  fs.writeFileSync(
    path.join(__dirname, 'horoscope.json'),
    JSON.stringify(data)
  );
}

// Promise block - get horoscope data asyncronously from remote source
const get = (url) =>
  new Promise((resolve, reject) => {
    fetch(url, {
      Options,
    })
      .then((res) => res.text())
      .then((body) => {
        resolve(body.match(/horoscope\s=?\s(.*)?;/)[1]);
      })
      .catch((error) => {
        reject(error);
      });
  });

// use the Promise to get data and parse JSON
const getJSON = (url) =>
  get(url)
    .then(JSON.parse)
    .catch((err) => {
      console.error(`getJSON failed for: ${url} ${err}`);
    });

const getHoroscope = () => Promise.all(urlArray().map(getJSON));

const loadZodiac = () => Promise.resolve(getZodiac());

const updateHoroscope = () => {
  const content = {};
  getHoroscope()
    .then((horoscope, content = {}) => {
      horoscope.forEach((outlook, index) => {
        content[SIGNS[index]] = outlook;
      });
      return content;
    })
    .then((content) => {
      writeJSON(content);
    });
};

async function Horoscope(sign) {
  sign = sign.toLowerCase();
  if (!isSign(sign)) {
    return {
      error: `${SIGNS}`,
    };
  }

  return loadZodiac()
    .then(JSON.parse)
    .then((zodiac) => {
      if (today() !== zodiac[sign].date) {
        updateHoroscope();
      }
      return zodiac[sign];
    });
}

module.exports = Horoscope;
