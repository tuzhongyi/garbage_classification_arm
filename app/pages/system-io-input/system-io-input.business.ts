import { IOInputPort } from '../../data-core/models/arm/io/io-input-port.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemIOInputBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  async load() {
    return this.service.io.input.array()
  }

  update(data: IOInputPort) {
    return this.service.io.input.update(data)
  }
}
