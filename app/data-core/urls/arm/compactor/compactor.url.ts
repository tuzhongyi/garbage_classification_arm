import { BaseUrl } from '../../base.url'

export class ArmCompactorUrl {
  static basic() {
    return `${BaseUrl.arm}/Compactors`
  }
  static item(id: string) {
    return `${this.basic()}/${id}`
  }
  static capability() {
    return `${this.basic()}/Capability`
  }

  static params(id: string) {
    return `${this.item(id)}/Params`
  }
  static ipaddress(id: string) {
    return `${this.item(id)}/IPAddress`
  }
  static compression(id: string) {
    return `${this.item(id)}/Compressions`
  }
  static command(id: string) {
    return `${this.item(id)}/Commands`
  }
}
