import { Platform } from '../../data-core/models/arm/platform.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class NetworkServerPlatformBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  async load() {
    return this.service.network.platform.access.get()
  }
  update(data: Platform) {
    return this.service.network.platform.access.update(data)
  }
  test() {
    return this.service.network.platform.access.testing()
  }
}
