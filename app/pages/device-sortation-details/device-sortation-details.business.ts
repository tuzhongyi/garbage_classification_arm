import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSortationRequestService } from '../../data-core/requests/services/sortation/sortation.service'

export class DeviceSortationDetailsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSortationRequestService(this.client.http)
  create(data: SortationDevice) {
    return this.service.device.create(data)
  }
}
