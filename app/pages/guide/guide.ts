import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { ArmGuideConfirm } from './guide-windows/guide.confirm'
import { ArmGuideWindow } from './guide-windows/guide.window'
import { ArmGuideHtmlController } from './guide.html.controller'
import { ArmGuideMessage } from './guide.message'

export namespace ArmGuide {
  export class Controller {
    private html = new ArmGuideHtmlController()
    private window = new ArmGuideWindow()
    confirm = new ArmGuideConfirm()
    message = new ArmGuideMessage(this.html.iframe, this.window, this.confirm)
    constructor() {
      this.regist()
      this.load()
    }
    private regist() {
      this.html.event.on('back', () => {
        location.href = '../main/main.html'
      })
      this.html.event.on('select', (key) => {
        LocalStorageService.navigation.device.robot.clear()
        this.load(key)
      })
    }

    private load(key?: number) {
      this.html.load(key)
    }
  }
  const controller = new Controller()
}
