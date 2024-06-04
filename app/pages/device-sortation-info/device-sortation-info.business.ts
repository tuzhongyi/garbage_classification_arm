import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSortationRequestService } from '../../data-core/requests/services/sortation/sortation.service'

export class DeviceSortationInfoBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSortationRequestService(this.client.http)

  load(id: string) {
    return this.service.device.get(id)
  }

  update(data: SortationDevice) {
    return this.service.device.update(data)
  }
  create(data: SortationDevice) {
    return this.service.device.create(data)
  }
  test(id: string) {
    return this.service.device.testing(id)
  }
}
