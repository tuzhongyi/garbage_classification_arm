import { HowellHttpClient } from '../../data-core/requests/http-client'
import { SystemCommand } from '../../data-core/requests/services/system/system.params'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
export class SystemMaintainCommandBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  command(command: string) {
    let params = new SystemCommand()
    params.Content = command
    return this.service.command(params)
  }
}
