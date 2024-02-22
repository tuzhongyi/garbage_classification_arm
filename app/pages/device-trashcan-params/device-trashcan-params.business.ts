import { TrashCanWarningParams } from '../../data-core/models/arm/analysis/trash-can-warning-params.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmTrashCansRequestService } from '../../data-core/requests/services/trash-cans/trash-cans.service'

export class DeviceTrashCanParamsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmTrashCansRequestService(this.client.http)

  load() {
    return this.service.warning.params.get()
  }

  update(data: TrashCanWarningParams) {
    return this.service.warning.params.update(data)
  }
}
