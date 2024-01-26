import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmMainConfirm } from './main-windows/main.confirm'
import { ArmMainWindow } from './main-windows/main.window'
import { ArmMainHtmlController } from './main.html.controller'
import { ArmMainMessage } from './main.message'

export namespace ArmMain {
  export class Controller {
    html = new ArmMainHtmlController()
    client = new HowellHttpClient.HttpClient()

    window = new ArmMainWindow()
    confirm = new ArmMainConfirm()
    message = new ArmMainMessage(
      this.html.element.iframe,
      this.window,
      this.confirm
    )
    constructor() {
      this.regist()
    }
    regist() {
      this.html.event.on('logout', () => {
        this.client.logout().finally(() => {
          location.href = '/'
        })
      })

      window.addEventListener('beforeunload', () => {
        // LocalStorageService.navigation.device.robot.clear()
      })
    }
  }
  const controller = new Controller()
}
