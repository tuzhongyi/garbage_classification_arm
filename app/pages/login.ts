import { MessageBar } from '../common/tools/message-bar/message-bar'
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
        this.client
          .login(data.username, data.password)
          .then((x) => {
            location.href = '/main/main.html'
          })
          .catch((e) => {
            MessageBar.error('用户名或密码错误')
          })
      })
    }
  }

  const controller = new Controller()
}
