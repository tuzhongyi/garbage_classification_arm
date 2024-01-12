import { SystemDeviceInfoBusiness } from './system-device-info.business'
import { SystemDeviceInfoHtmlController } from './system-device-info.html.controller'

export namespace SystemDeviceInfo {
  class Controller {
    constructor() {
      this.init()
    }
    html = new SystemDeviceInfoHtmlController()
    business = new SystemDeviceInfoBusiness()
    async init() {
      let info = await this.business.load()
      this.html.load(info)
    }
  }

  const controller = new Controller()
}
