require('./src/utils/console-extensions')

const { join } = require('path')
const { config } = require('dotenv')
const { exists } = require('fs-extra')
const ValidationMessages = require('./validate-env-messages.json')

const REQUIRED_DOT_ENV_PROPS = ['TOKEN']

function checkIfDotEnvExists() {
  const dotEnvFilePath = join(__dirname, '.env')
  return new Promise((resolve, reject) => {
    exists(dotEnvFilePath).then(
      doesIt =>
        doesIt ? resolve() : reject({ message: '.env file not found' })
    )
  })
}

function validateDotEnvFile() {
  return new Promise((resolve, reject) => {
    config()
    const missingProperties = []
    REQUIRED_DOT_ENV_PROPS.forEach(p => {
      const dotEnvProperty = process.env[p]
      if (typeof dotEnvProperty === 'undefined' || !dotEnvProperty) {
        missingProperties.push(p)
      }
    })

    const missingRecommendedProperties = Object.keys(ValidationMessages).reduce(
      (missing, current) => {
        const dotEnvProperty = process.env[current]
        if (typeof dotEnvProperty === 'undefined' || !dotEnvProperty) {
          missing.push(' - ' + current + ':: ' + ValidationMessages[current])
        }
        return missing
      },
      []
    )

    missingProperties.length === 0
      ? resolve(
          missingRecommendedProperties.length
            ? missingRecommendedProperties
            : []
        )
      : reject({
          message:
            'Please add these valid properties to your .env file - ' +
            missingProperties.join(', ')
        })
  })
}

function allGood(props) {
  if (props.length) {
    console.yellow(
      `Some of the recommended properties are not provided in .env file`
    )
    console.yellow(props.join('\n'))
  }

  console.green('All good... Attempting to spawn the bot')
}

function somethingsWrong(error) {
  console.red(error.message + '\n')
  // exit process with error code 1 to make sure the subsequent start task invocation is prevented
  process.exit(1)
}

checkIfDotEnvExists()
  .then(validateDotEnvFile)
  .then(allGood)
  .catch(somethingsWrong)
