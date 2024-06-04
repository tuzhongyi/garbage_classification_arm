import { LocalStorageService } from '../common/local-storage/local-storage.service'
import { HowellHttpClient } from '../data-core/requests/http-client'
import { ILoginEventArgs } from './login.event'
import { ArmLoginHtmlController } from './login.html.controller'

export namespace ArmLogin {
  class Controller {
    constructor() {
      this.regist()
    }

    private html = new ArmLoginHtmlController()
    client = new HowellHttpClient.HttpClient()

    timeout() {
      const date = LocalStorageService.logout.get()
      if (date) {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        if (diff > 1000 * 60 * 60 * 1) {
          LocalStorageService.navigation.clear()
        }
      }
    }

    regist() {
      this.html.event.on('login', (data: ILoginEventArgs) => {
        this.timeout()
        LocalStorageService.login.save({
          username: this.html.element.username.value,
        })
        LocalStorageService.navigation.device.robot.clear()
        LocalStorageService.navigation.device.sortation.clear()
        location.href = '/main/main.html'
        // this.client
        //   .login(data.username, data.password)
        //   .then((x) => {
        //     location.href = '/main/main.html'
        //   })
        //   .catch((e) => {
        //     MessageBar.error('用户名或密码错误')
        //   })
        //   .finally(() => {
        //     LocalStorageService.navigation.device.robot.clear()
        //   })
      })
    }
  }

  const controller = new Controller()
}
