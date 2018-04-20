const Communication = require('./')

class WhoAreYou extends Communication {
  constructor (...args) {
    super(args)
    this.hears = [ 'who are you?$' ]
    this.example = 'hi, who are you?'
    this.description = 'This command ask to the bot who it is'
    this.types = 'direct_message,direct_mention,mention'
  }

  async answer (bot, message) {
    bot.reply(message, ':robot_face: Hello human! I think that the right question is who are YOU? :thinking:')
  }
}

module.exports = WhoAreYou
