import { SystemStatusProcessBusiness } from './system-status-process.business'
import { SystemStatusProcessHtmlController } from './system-status-process.html.controller'

export namespace SystemStatusProcess {
  class Controller {
    constructor() {
      this.init()
    }
    html = new SystemStatusProcessHtmlController()
    business = new SystemStatusProcessBusiness()
    async init() {
      let status = await this.business.load()

      this.html.element.table.load(status)
    }
  }

  let controller = new Controller()
}
