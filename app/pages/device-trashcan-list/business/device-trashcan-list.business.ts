import { instanceToPlain, plainToInstance } from 'class-transformer'
import { RobotTrashCan } from '../../../data-core/models/robot/robot-trash-can.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmTrashCansRequestService } from '../../../data-core/requests/services/trash-cans/trash-cans.service'
import { DeviceTrashCanModel } from '../device-trashcan-list.model'
import { DeviceTrashCanListChannelBusiness } from './device-trashcan-list-channel.business'

export class DeviceTrashCanListBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmTrashCansRequestService(this.client.http)
  channel = new DeviceTrashCanListChannelBusiness(this.client.http)

  async load() {
    let datas = await this.service.array()
    let models = datas.map((x) => this.convert(x))
    return models
  }

  private convert(data: RobotTrashCan) {
    let plain = instanceToPlain(data)
    let model = plainToInstance(DeviceTrashCanModel, plain)
    if (model.SourceFrom) {
      model.channel = this.channel.get(model.SourceFrom)
    }
    return model
  }
}
