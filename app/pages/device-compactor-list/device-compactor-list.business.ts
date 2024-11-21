import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmCompactorRequestService } from '../../data-core/requests/services/compactor/compactor.service'

export class DeviceCompactorListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmCompactorRequestService(this.client.http)

  load() {
    return this.service.array()
  }
  delete(id: string) {
    return this.service.delete(id)
  }
}
