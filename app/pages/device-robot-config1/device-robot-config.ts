import { DeviceRobotConfigBusiness } from './device-robot-config.business'
import { DeviceRobotConfigHtmlController } from './device-robot-config.html.controller'

export namespace DeviceRobotConfig {
  class Controller {
    constructor() {
      this.init()
    }
    html = new DeviceRobotConfigHtmlController()
    business = new DeviceRobotConfigBusiness()
    async init() {}
  }

  const controller = new Controller()
}
