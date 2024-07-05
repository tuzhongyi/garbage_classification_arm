import { FrpInfo } from '../../data-core/models/frp-info/frp-info.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class NetworkFrpDetailsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)
  create(data: FrpInfo) {
    return this.service.network.frp.create(data)
  }
}
