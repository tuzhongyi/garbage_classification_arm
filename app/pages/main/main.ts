import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { MainMessageEvent } from './main.event'
import { ArmMainHtmlController } from './main.html.controller'
import { ArmMainWindow } from './main.window'

export namespace ArmMain {
  export class Controller {
    html = new ArmMainHtmlController()
    client = new HowellHttpClient.HttpClient()
    message: EventMessageProxy<MainMessageEvent>
    window = new ArmMainWindow()
    constructor() {
      this.message = new EventMessageProxy(this.html.element.iframe)
      this.regist()
    }
    regist() {
      this.html.event.on('logout', () => {
        this.client.logout().finally(() => {
          location.href = '/'
        })
      })

      this.message.event.on('open', (args) => {
        this.window.open(args)
      })
    }
  }
  const controller = new Controller()
}
