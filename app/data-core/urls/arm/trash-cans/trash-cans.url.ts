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

  static warning = {
    params: () => {
      return `${this.basic()}/WarningParams`
    },
  }
}
