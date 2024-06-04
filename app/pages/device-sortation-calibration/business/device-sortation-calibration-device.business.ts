import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSortationRequestService } from '../../../data-core/requests/services/sortation/sortation.service'

export class DeviceSortationCalibrationRobotBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSortationRequestService(this.client.http)

  get(id: string) {
    return this.service.device.get(id)
  }
}
