import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { DigestWindow } from './auth/auth.model'
import { HowellAuthHttp } from './auth/howell-auth-http'

import { UserRequestService } from './services/user.service'

export namespace HowellHttpClient {
  export class HttpClient {
    service: UserRequestService
    digistWindow: DigestWindow = window
    constructor() {
      this.service = new UserRequestService(this.http)
    }

    login(username: string, password: string) {
      return this.service.login(username, password)
    }

    async logout() {
      let sign = LocalStorageService.login.get()
      if (sign) {
        return this.service.logout(sign.username)
      }
      return undefined
    }

    get http() {
      if (!this.digistWindow.http) {
        this.digistWindow.http = new HowellAuthHttp()
      }
      return this.digistWindow.http
    }
  }
}
