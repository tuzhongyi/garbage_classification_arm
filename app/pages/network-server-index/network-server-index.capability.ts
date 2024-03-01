import { Manager } from '../../data-core/requests/managers/manager'

export class NetworkServerIndexCapability {
  constructor() {
    this.init()
  }
  private element = {
    PlatformAccess: document.getElementsByName('Capability.PlatformAccess'),
  }

  init() {
    Manager.capability.network.then((x) => {
      if (!x.PlatformAccess) {
        this.element.PlatformAccess.forEach((item) => {
          item.style.display = 'none'
        })
      }
    })
  }
}
