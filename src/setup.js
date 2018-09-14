const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const defaults = require('')_
const config = {}

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
