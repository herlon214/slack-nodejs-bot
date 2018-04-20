const Communication = require('./')

class Hello extends Communication {
  constructor (...args) {
    super(args)
    this.example = 'hello'
    this.description = 'A salutation command'
    this.hears = [ 'hello' ]
  }

  async answer (bot, message) {
    bot.reply(message, ':robot_face: Hello human, how can I help you?')
  }
}

module.exports = Hello
