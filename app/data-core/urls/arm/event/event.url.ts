import { BaseUrl } from '../../base.url'
import { ArmEventRecordsUrl } from './event-record.url'

export class ArmEventUrl {
  static basic() {
    return `${BaseUrl.arm}/Events`
  }
  static item(id: string) {
    return `${this.basic()}/${id}`
  }
  static capability() {
    return `${this.basic()}/Capability`
  }

  static picture(id: string) {
    return `${this.basic()}/Pictures/${id}`
  }

  static get record() {
    return new ArmEventRecordsUrl(this.basic())
  }
}
