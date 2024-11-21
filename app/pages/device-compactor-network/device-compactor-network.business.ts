import { IPAddress } from '../../data-core/models/arm/ip-address.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmCompactorRequestService } from '../../data-core/requests/services/compactor/compactor.service'

export class DeviceCompactorNetworkBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmCompactorRequestService(this.client.http)

  load(id: string) {
    return this.service.ipaddress.get(id)
  }

  update(id: string, data: IPAddress) {
    return this.service.ipaddress.update(id, data)
  }
}
