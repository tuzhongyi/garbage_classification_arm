import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
import { SystemMaintainConfigHtmlController } from './system-maintain-config.html.controller'

export namespace SystemMaintainConfig {
  class Controller {
    constructor() {
      this.init()
    }
    html = new SystemMaintainConfigHtmlController()
    client = new HowellHttpClient.HttpClient()
    service = new ArmSystemRequestService(this.client.http)

    async init() {
      let status = await this.service.status.running()
    }
  }

  const controller = new Controller()
}
