import { User } from '../../models/user/user.model'
import { UserUrl } from '../../urls/user/user.url'
import { HowellAuthHttp } from '../auth/howell-auth-http'

export class UserRequestService {
  constructor(private http: HowellAuthHttp) {}

  login(username: string, passowrd: string) {
    let url = UserUrl.login(username)
    return this.http.auth(username, passowrd, url)
  }
  logout(username: string) {
    let url = UserUrl.logout(username)
    return this.http.get(url).then((x) => {
      this.http.clear()
      return x
    })
  }

  create(item: User) {
    let url = UserUrl.basic()
    return this.http.post<User>(url, item)
  }

  get(id: string) {
    let url = UserUrl.item(id)
    return this.http.get(url)
  }

  set(item: User) {
    let url = UserUrl.item(item.Id)
    return this.http.put<User>(url, item)
  }

  del(id: string) {
    let url = UserUrl.item(id)
    return this.http.delete(url)
  }

  list() {
    let url = UserUrl.list()
    return this.http.get(url)
  }
}
