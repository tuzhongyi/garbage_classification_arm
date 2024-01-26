import { LocalStorageService } from '../common/local-storage/local-storage.service'
import { HowellHttpClient } from '../data-core/requests/http-client'
import { ILoginEventArgs } from './login.event'
import { ArmLoginHtmlController } from './login.html.controller'

export namespace ArmLogin {
  class Controller {
    constructor() {
      this.regist()
    }

    html = new ArmLoginHtmlController()
    client = new HowellHttpClient.HttpClient()

    regist() {
      this.html.event.on('login', (data: ILoginEventArgs) => {
        LocalStorageService.navigation.device.robot.clear()
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
