import { Manager } from '../../data-core/requests/managers/manager'

export class NetworkConfigIndexCapability {
  constructor() {
    this.init()
  }
  private element = {
    SSH: document.getElementsByName('Capability.SSH'),
  }

  init() {
    Manager.capability.network.then((x) => {
      if (!x.SSH) {
        this.element.SSH.forEach((item) => {
          item.style.display = 'none'
        })
      }
    })
  }
}
