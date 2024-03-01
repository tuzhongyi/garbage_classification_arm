import { SystemStatusRunningBusiness } from './system-status-running.business'
import { SystemStatusRunningHtmlController } from './system-status-running.html.controller'

export namespace SystemStatusRunning {
  class Controller {
    constructor() {
      this.init()
    }
    html = new SystemStatusRunningHtmlController()
    business = new SystemStatusRunningBusiness()
    async init() {
      this.business.load().then((status) => {
        this.html.load(status)
      })
    }
  }

  const controller = new Controller()
}
