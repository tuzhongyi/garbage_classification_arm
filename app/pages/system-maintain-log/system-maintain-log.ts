import { SystemMaintainLogBusiness } from './system-maintain-log.business'
import { SystemMaintainLogHtmlController } from './system-maintain-log.html.controller'

export namespace SystemMaintainLog {
  class Controller {
    constructor() {
      this.init()
    }
    html = new SystemMaintainLogHtmlController()
    business = new SystemMaintainLogBusiness()
    async init() {
      this.business.load()
    }
  }

  let controller = new Controller()
}
