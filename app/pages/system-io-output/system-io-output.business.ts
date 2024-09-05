import { IOState } from '../../data-core/enums/io/io-state.enum'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { IOOutputWorkSheet } from '../../data-core/models/arm/io/io-output-work-sheet.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { SetIOStateParams } from '../../data-core/requests/services/system/io/system-io-output.params'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class SystemIOOutputBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  load() {
    return this.service.io.output.array()
  }
  update(data: IOOutputPort) {
    return this.service.io.output.update(data)
  }
  state(id: number, state: IOState) {
    let params = new SetIOStateParams()
    params.State = state
    return this.service.io.output.state(id, params)
  }
  sheet = {
    get: (id: number) => {
      return this.service.io.output.work.sheet.get(id)
    },
    set: (data: IOOutputWorkSheet) => {
      return this.service.io.output.work.sheet.set(data)
    },
  }
}
