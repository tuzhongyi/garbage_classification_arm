import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'

export class DeviceDropPortDetailsOutputBusiness {
  private service: ArmSystemRequestService
  constructor(client: HowellHttpClient.HttpClient) {
    this.service = new ArmSystemRequestService(client.http)
  }

  load() {
    return this.service.io.output.array()
  }
}
