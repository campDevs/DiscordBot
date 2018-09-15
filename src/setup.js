const readline = require('readline')
const colors = require('colors')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const defaults = require('./defaults.json')
const config = {}

/**
 * An array of objects to document which fields are needed for
 * configuration files. Each entry should have the following
 * fields.
 *
 * - field: the name of the field in the config file
 * - type: array/boolean/string - the expected type of value from the user
 * - prompt: a string to display to the user to help them provide an answer
 *
 * In addition, the following fields may be optionally be provided.
 *
 * - onlyIf: a function which takes an input representing the configuration file so far,
 *   and returns true only if the user should be prompted for this field.
 */
const CONFIG_FIELDS = [
  {
    field: 'owners',
    type: 'array',
    prompt: 'IDs of people who are listed as bot owners',
  },
  {
    field: 'prefix',
    type: 'string',
    prompt: 'Prefix for commands to the bot'
  },
  {
    field: 'adminTransparency',
    type: 'boolean',
    prompt: 'Should admin actions (e.g. kicking) be transparently broadcast to a channel'
  },
  {
    onlyIf: config => config.adminTransparency,
    field: 'auditChannel',
    type: 'string',
    prompt: 'Channel where admin actions will be broadcast to'
  }
]

/**
 * An object to document the strings that should be appended to
 * prompts. The key should be the type (as stated in CONFIG_FIELDS).
 *
 * The default is the empty string. 
 */
const howToAnswer = {
  array: '(space-seperated values)',
  boolean: '(y/n)'
}

/**
 * How to convert an input into the object that should be added
 * to the configuration file. The default is the identity function. (s => s)
 *
 * They key should be the type (as stated in CONFIG_FIELDS)
 */
const mapTypes = {
  array: s => s.split(' '),
  boolean: s => s.toLowerCase().startsWith('y')
}

/**
 * How to convert the default values in defaults.json to something
 * the user could've typed themselves.
 *
 * If the output is the empty string, it will be replaced with a red '(empty)'
 *
 * The key should be the type (as stated in CONFIG_FIELDS)
 *
 * The default is the identity function (s => s)
 */
const unmapTypes = {
  array: s => s.join(' '),
  boolean: s => ['no', 'yes'][s]
}

/**
 * An object to check that an input from the user isn't malformed.
 * If it is, the user will be re-prompted. "true" means that the
 * input is NOT malformed, but is instead valid. The default is (() => true)
 *
 * The key should be the type (as stated in CONFIG_FIELDS)
 */
const validateTypes = {
  boolean: s => ['y', 'yes', 'n', 'no'].includes(s.toLowerCase())
}

handleField(CONFIG_FIELDS.shift())

function handleField(configElement) {
  if(typeof configElement === 'undefined') {
    return
  }
 
  if(configElement.onlyIf && !configElement.onlyIf(config)) {
   return  
  }

  const mapper = mapTypes[configElement.type] || (s => s) 
  const validator = validateTypes[configElement.type] || (() => true)
  
  const help = configElement.prompt
  const helpForType = howToAnswer[configElement.type] || ''

  const punctuation = configElement.type === 'boolean' ? '?' : ':'

  const defaultValue = (unmapTypes[configElement.type] || (s => s))(defaults[configElement.field])
  const coloredDefault = defaultValue !== '' ? defaultValue.green : '(empty)'.red

  const text = help.blue + `${punctuation} (default is ${coloredDefault}) ${helpForType.inverse} `.replace(/ +/, ' ')

  recursiveQuestion(text, s => !s || validator, answer => {
    config[configElement.field] = answer ? mapper(answer) : defaults[configElement.field]
    handleField(CONFIG_FIELDS.shift())
  })
}

/**
 * Prompt the user for an input until the validation function passes.
 * When it does, call the callback.
 *
 * @param {string} arg - The text to use to prompt the user
 * @param {function} conditionFunction - The function to determine whether to stop prompting the user
 * @param {function} cb - The callback to invoke when conditionFunction returns true
 */
function recursiveQuestion(arg, conditionFunction, cb) {
  rl.question(arg, answer => {
    if(conditionFunction(answer)) {
      cb(answer)
    } else {
      recursiveQuestion(...arguments)
    }
  })
}

