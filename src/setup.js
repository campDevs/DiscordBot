const readline = require('readline')
const path = require('path')
const fs = require('fs')
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
 * How to convert a user input into the CLI that should be added
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
  boolean: s => s ? 'yes' : 'no'
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

/**
 * An object to decide the punctuation to be used after the prompt.
 * If not specified, a ':' (colon) will be used.
 */
const punctuationForTypes = {
  boolean: '?'
}

handleField(CONFIG_FIELDS.shift())

/**
 * A function to handle a field in CONFIG_FIELDS.
 * Calls itself on CONFIG_FIELDS.shift()
 *
 * @param {Object|undefined} configElement - the configuration element (that can be found in CONFIG_FIELDS) or undefined to indicate save prompt
 */
function handleField(configElement) {
  if(typeof configElement === 'undefined') {
    const json = jsonToString(config)
    console.log(json)
    const question = generateQuestion('Save file locally', '(y/n)', '?', 'yes')
    recursiveQuestion(question, validateTypes.boolean, answer => {
      if(['y', 'yes', ''].includes(answer.toLowerCase())) {
        fs.writeFileSync(path.join(__dirname, '../config.json'), json.strip)
        console.log('File written sucessfully, exiting.'.green)
        process.exit(0)
      } else {
        console.log('You chose no, quiting without writing.'.red)
        process.exit(0)
      }
    })
    return
  }
 
  if(configElement.onlyIf && !configElement.onlyIf(config)) {
    handleField(CONFIG_FIELDS.shift())
    return
  }

  const mapper = mapTypes[configElement.type] || (s => s) 
  const validator = validateTypes[configElement.type] || (() => true)
  
  const help = configElement.prompt
  const helpForType = howToAnswer[configElement.type] || ''

  const punctuation = punctuationForTypes[configElement.type] || ':'

  const defaultValue = (unmapTypes[configElement.type] || (s => s))(defaults[configElement.field])
  
  const text = generateQuestion(help, helpForType, punctuation, defaultValue)

  recursiveQuestion(text, s => !s || validator(s), answer => {
    config[configElement.field] = answer ? mapper(answer) : defaults[configElement.field]
    handleField(CONFIG_FIELDS.shift())
  })
}

/**
 * Generate a coloured question
 *
 * @param {string} prompt - The question to ask the user
 * @param {string} typeHelp - Help the user understand how to enter a valid member of the type
 * @param {string} punctuation - The punctuation to be used directly after the prompt
 * @param {string} defaultValue - The value that is considered the default
 */
function generateQuestion(prompt, typeHelp, punctuation, defaultValue) {
  const coloredDefault = defaultValue === '' ? '(empty)'.red : defaultValue.green
  return prompt.blue + `${punctuation} (default is ${coloredDefault}) ${typeHelp.inverse} `.replace(/ +/, ' ')
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

/**
 * A work-in-progress function to create JSON strings that contain whitespace. The
 * function works recursively. Do not pass it circular objects, it will
 * not detect it and the recursive stack will overflow.
 *
 * @todo Handle indentation when nesting objects
 *
 * @param {*} obj - The object to convert to JSON
 * @return {string} The stringified JSON
 */
function jsonToString(obj) {
  if(Array.isArray(obj)) {
    return '['.magenta + obj.map(i => jsonToString(i)).join(', '.cyan) + ']'.magenta
  }
  if(typeof obj === 'string') {
    return JSON.stringify(obj).red
  }
  if(typeof obj === 'boolean') {
    return JSON.stringify(obj).green
  }
  return '{\n'.magenta + Object.keys(obj).map(key => '  ' + jsonToString(key).strip.cyan + ': '.cyan + jsonToString(obj[key])).join(',\n'.magenta) + '\n}'.magenta
}

