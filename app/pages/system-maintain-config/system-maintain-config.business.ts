import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemMaintainConfigBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  reboot() {
    return this.service.reboot()
  }
  shutdown() {
    return this.service.shutdown()
  }

  factory = {
    reset: (mode: FactoryResetMode) => {
      return this.service.factory.reset(mode)
    },
  }

  download() {
    this.service.data.configuration.download()
  }
}
