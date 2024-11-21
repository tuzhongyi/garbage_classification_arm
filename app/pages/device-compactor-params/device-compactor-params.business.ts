import { CompactorParams } from '../../data-core/models/compactor/compactor-params.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmCompactorRequestService } from '../../data-core/requests/services/compactor/compactor.service'

export class DeviceCompactorParamsBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmCompactorRequestService(this.client.http)

  load(id: string) {
    return this.service.params.get(id)
  }

  update(id: string, data: CompactorParams) {
    return this.service.params.update(id, data)
  }
}
