const Botkit = require('botkit')
const { SLACK_TOKEN } = process.env
const controller = Botkit.slackbot({ debug: false })
const fs = require('fs')
let bot = controller.spawn({ token: SLACK_TOKEN }).startRTM()
const debug = require('debug')('slack-bot')

// Reconnect
controller.on('rtm_close', (bot, err) => {  
  bot = controller.spawn({ token: SLACK_TOKEN }).startRTM()
})

/**
 * Load communication
 */
fs.readdirSync('./src/communication').filter((file) => file !== 'index.js').map((file) => {
  const Communicator = require('./communication/' + file)
  let communication = new Communicator()
  debug(`Registering communication ${communication.example}...`)

  controller.hears(communication.hears, communication.types, communication.answer.bind(communication))
})

/**
 * Default help command return a list of all available commands
 */
controller.hears([ 'help' ], 'direct_message,direct_mention,mention', async (bot, message) => {
  const commands = fs.readdirSync('./src/communication')
    .filter((file) => file !== 'index.js')
    .map((file) => {
      const Communicator = require('./communication/' + file)
      return new Communicator()
    })
    .reduce((commandList, command) => {
      return commandList + `*${command.example}*\n${command.description}\n\n`
    }, '')

  const body = `:robot_face: My commands are:\n\n${commands}\n:wink:`
  bot.reply(message, body)
})