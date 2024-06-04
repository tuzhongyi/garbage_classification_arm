import { BaseUrl } from '../../base.url'
import { ArmSortationDeviceUrl } from './sortation-device.url'

export class ArmSortationUrl {
  static basic() {
    return `${BaseUrl.arm}/Sortations`
  }
  static item(id: string) {
    return `${this.basic()}/${id}`
  }

  static get device() {
    return new ArmSortationDeviceUrl(this.basic())
  }
  static capability() {
    return `${this.basic()}/Capability`
  }
}
