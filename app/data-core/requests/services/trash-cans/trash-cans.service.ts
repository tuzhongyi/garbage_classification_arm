import { plainToInstance } from 'class-transformer'
import { TrashCanCapability } from '../../../models/capabilities/robot/trash-can-capability.model'
import { HowellResponse } from '../../../models/response'
import { RobotTrashCan } from '../../../models/robot/robot-trash-can.model'
import { ArmTrashCansUrl } from '../../../urls/arm/trash-cans/trash-cans.url'
import { HowellAuthHttp } from '../../auth/howell-auth-http'

export class ArmTrashCansRequestService {
  constructor(private http: HowellAuthHttp) {}

  async array() {
    let url = ArmTrashCansUrl.basic()
    let response = await this.http.get<HowellResponse<RobotTrashCan[]>>(url)
    return plainToInstance(RobotTrashCan, response.Data)
  }
  async capability() {
    let url = ArmTrashCansUrl.capability()
    let response = await this.http.get<HowellResponse<TrashCanCapability>>(url)
    return plainToInstance(TrashCanCapability, response.Data)
  }
}
