import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmGuideConfirm } from './guide-windows/guide.confirm'
import { ArmGuideWindow } from './guide-windows/guide.window'
import { ArmGuideHtmlController } from './guide.html.controller'
import { ArmGuideMessage } from './guide.message'

export namespace ArmGuide {
  export class Controller {
    private html = new ArmGuideHtmlController()
    client = new HowellHttpClient.HttpClient()

    private window = new ArmGuideWindow()
    confirm = new ArmGuideConfirm()
    private message = new ArmGuideMessage(
      this.html.element.iframe,
      this.window,
      this.confirm
    )
    constructor() {
      this.regist()
      this.load()
    }
    regist() {
      this.html.event.on('back', () => {
        this.client.logout().finally(() => {
          location.href = '../main/main.html'
        })
      })
      this.html.event.on('select', (key) => {
        LocalStorageService.navigation.device.robot.clear()
        this.load(key)
      })
    }

    load(key?: number) {
      this.html.load(key)
    }
  }
  const controller = new Controller()
}
