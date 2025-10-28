import { LocalStorageService } from '../common/local-storage/local-storage.service'
import { MessageBar } from '../common/tools/controls/message-bar/message-bar'
import { ArmLoginBusiness } from './login.business'
import { ILoginEventArgs } from './login.event'
import { ArmLoginHtmlController } from './login.html.controller'
import { ArmMainWindow } from './main/main-windows/main.window'
import { WindowModel } from './window/window.model'

export namespace ArmLogin {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }

    private business = new ArmLoginBusiness()
    private html = new ArmLoginHtmlController()
    private window = new ArmMainWindow()

    private init() {
      this.business.load().then((x) => {
        if (x.SerialNumber.includes('-100000')) {
          this.open()
        }
      })
    }

    private timeout() {
      const date = LocalStorageService.logout.get()
      if (date) {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        if (diff > 1000 * 60 * 60 * 1) {
          LocalStorageService.navigation.clear()
        }
      }
    }

    private regist() {
      this.html.event.on('login', (data: ILoginEventArgs) => {
        this.timeout()
        LocalStorageService.login.save({
          username: this.html.element.username.value,
        })
        LocalStorageService.navigation.device.robot.clear()
        LocalStorageService.navigation.device.sortation.clear()
        LocalStorageService.navigation.device.compactor.clear()
        location.href = '/main/main.html'
      })
      this.html.event.on('information', () => {
        this.open()
      })
      this.window.message.event.on('result', (x) => {
        if (x) {
          MessageBar.success('修改成功')
        } else {
          MessageBar.error('修改失败')
        }
      })
    }

    private open() {
      let args = new WindowModel()
      args.url = './main-information-device/main-information-device.html'
      args.style = {
        width: '600px',
        height: '180px',
      }
      this.window.open(args)
    }
  }

  const controller = new Controller()
}
