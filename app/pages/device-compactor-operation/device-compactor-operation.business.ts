import { CompactorCommandType } from '../../data-core/enums/compactor/compactor-command-type.enum'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { CompactorCommand } from '../../data-core/requests/services/compactor/compactor.params'
import { ArmCompactorRequestService } from '../../data-core/requests/services/compactor/compactor.service'

export class DeviceCompactorOperationBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmCompactorRequestService(this.client.http)

  async start(id: string) {
    return this.service.compression.run(id)
  }

  async stop(id: string) {
    return this.service.compression.delete(id)
  }

  async load(id: string) {
    return this.service.compression.get(id)
  }

  command(id: string, command: CompactorCommandType) {
    let params = new CompactorCommand()
    params.CommandType = command
    return this.service.command(id, params)
  }
}
