import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class NetworkFrpListBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  async load() {
    return this.service.network.frp.array()
  }

  delete(id: string) {
    return this.service.network.frp.delete(id)
  }
}
