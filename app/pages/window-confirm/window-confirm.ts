import { ConfirmWindowHtmlController } from './window-confirm.html.controller'
import { ConfirmWindowMessage } from './window-confirm.message'

export namespace ConfirmWindow {
  class Controller {
    constructor() {
      this.regist()
    }
    html = new ConfirmWindowHtmlController()
    message = new ConfirmWindowMessage()

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
      this.message.receiver.on('confirm_open', (args) => {
        this.html.load(args)
      })
    }

    onok() {
      this.message.sender.emit('confirm_result', true)
      this.message.sender.emit('confirm_close')
    }
    oncancel() {
      this.message.sender.emit('confirm_close')
    }
  }

  const controller = new Controller()
}
