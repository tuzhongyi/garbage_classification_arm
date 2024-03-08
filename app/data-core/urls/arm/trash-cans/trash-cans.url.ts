import { BaseUrl } from '../../base.url'

export class ArmTrashCansUrl {
  static basic() {
    return `${BaseUrl.arm}/TrashCans`
  }
  static item(id: string) {
    return `${this.basic()}/${id}`
  }
  static capability() {
    return `${this.basic()}/Capability`
  }

  static records() {
    return `${this.basic()}/Records`
  }

  static warning = {
    params: () => {
      return `${this.basic()}/WarningParams`
    },
  }
}
