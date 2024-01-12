import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemMaintainLogBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  load() {}
}
