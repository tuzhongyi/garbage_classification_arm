import { Manager } from '../../data-core/requests/managers/manager'

export class NetworkServerDeploymentCapability {
  constructor() {
    this.init()
  }
  private element = {
    GarbageServer: document.getElementsByName('Capability.GarbageServer'),
    ISUPServer: document.getElementsByName('Capability.ISUPServer'),
  }
  private inited = false

  private init() {
    Manager.capability.depolyment
      .then((x) => {
        if (!x.GarbageServer) {
          this.element.GarbageServer.forEach((item) => {
            item.style.display = 'none'
          })
        }
        if (!x.ISUPServer) {
          this.element.ISUPServer.forEach((item) => {
            item.style.display = 'none'
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }
}
