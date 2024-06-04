import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSortationRequestService } from '../../data-core/requests/services/sortation/sortation.service'

export class DeviceSortationListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSortationRequestService(this.client.http)

  load() {
    return this.service.device.array()
  }
  delete(id: string) {
    return this.service.device.delete(id)
  }
}
