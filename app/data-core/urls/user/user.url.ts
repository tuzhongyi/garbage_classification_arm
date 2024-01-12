import { PagedParams } from '../../models/params.interface'
import { AbstractUrl } from '../abstract.url'
import { BaseUrl } from '../base.url'

export class UserUrl extends AbstractUrl {
  private static url = new UserUrl(`${BaseUrl.user_system}/Users`)

  static basic() {
    return this.url.basic()
  }
  static item(id: string) {
    return this.url.item(id)
  }
  static list() {
    return this.url.list()
  }
  static login(username: string): string {
    return `${this.basic()}/Login/${username}`
  }
  static logout(username: string): string {
    return `${this.basic()}/Logout/${username}`
  }

  static role(userId: string) {
    return new UserRoleUrl(this.item(userId))
  }

  static config(userId: string) {
    return new UserConfigUrl(this.item(userId))
  }

  static label() {
    return new UserLabelUrl(this.basic())
  }
  static password(userId: string) {
    return new UserPasswordUrl(this.item(userId))
  }
}

class UserRoleUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Roles`)
  }
  basic(params?: PagedParams) {
    let query = this.toQueryString(params)
    return `${this.base}${query}`
  }

  toQueryString(params?: PagedParams) {
    if (!params) return ''
    if (params.PageIndex && params.PageSize) {
      return `?=PageIndex${params.PageIndex}&PageSize=${params.PageSize}`
    } else if (params.PageIndex) {
      return `?=PageIndex${params.PageIndex}`
    } else if (params.PageSize) {
      return `?=PageSize${params.PageSize}`
    } else {
      return ''
    }
  }
}
class UserConfigUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Config`)
  }
  override item<T = number>(type: T) {
    return `${this.basic()}/${type}`
  }
}
class UserLabelUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Labels`)
  }

  type(id: string, type: number) {
    return `${this.item(id)}/LabelTypes/${type}`
  }
}
export class UserPasswordUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Passwords`)
  }

  random() {
    return `${this.basic()}/Random`
  }

  change() {
    return `${this.basic()}/Change`
  }
}
