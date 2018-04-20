const debug = require('debug')('slack-bot')
/**
 * Chatbot base communication class
 */
class Communication {
  constructor () {
    this.hears = []
    this.description = 'Write the command description'
    this.example = 'Write a message example here'
    this.types = 'direct_message,direct_mention,mention'
  }

  async answer (bot, message) {
    throw new Error('Method answer not implemented.')
  }

  defaultErr (bot, message, err) {
    debug(err)
    bot.reply(message, `Ops, looks like something went wrong...\n \`\`\`${err}\`\`\` `)
  }
}

module.exports = Communication
