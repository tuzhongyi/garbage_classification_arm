import { instanceToPlain, plainToInstance } from 'class-transformer'
import { IOState } from '../../../data-core/enums/io/io-state.enum'
import { CanType } from '../../../data-core/enums/robot/robot-can-type.model'
import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { DropPortConfig } from '../../../data-core/models/arm/io/drop-port-config.model'
import { Polygon } from '../../../data-core/models/arm/polygon.model'
import { HowellHttpClient } from '../../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../../data-core/requests/services/system/system.service'
import { DeviceDropPortModel } from '../device-drop-port-list.model'
import { DeviceDropPortListChannelBusiness } from './device-drop-port-list-channel.business'

export class DeviceDropPortListBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)
  channel = new DeviceDropPortListChannelBusiness(this.client.http)

  async load() {
    let datas = await this.service.drop.port.array()
    let models = datas.map((x) => this.convert(x))
    return models
  }

  delete(id: number) {
    return this.service.drop.port.delete(id)
  }

  async test() {
    let channels = await this.channel.load()
    let datas = channels.map((x) => this.create(x)).sort((a, b) => a.Id - b.Id)
    let models = datas.map((x) => this.convert(x))
    return models
  }

  private create(channel: InputProxyChannel) {
    let port = new DeviceDropPortModel()
    port.Id = channel.Id
    port.ChannelId = channel.Id
    port.Name = channel.Name
    port.DefaultIOState = IOState.Low
    port.AlarmOutEnabled = true
    port.AlarmOutIds = [1, 3]
    port.DropPortState = 'Closed'
    port.DropPortType = CanType.Recycle
    port.TrashCanPortState = 'Closed'
    port.TrashCanArea = new Polygon()
    port.TrashCanArea.Coordinates = [
      { X: 0.2, Y: 0.2 },
      { X: 0.2, Y: 0.8 },
      { X: 0.8, Y: 0.8 },
      { X: 0.8, Y: 0.2 },
      { X: 0.2, Y: 0.2 },
    ]
    return port
  }

  private convert(data: DropPortConfig) {
    let plain = instanceToPlain(data)
    let model = plainToInstance(DeviceDropPortModel, plain)
    if (model.ChannelId) {
      model.channel = this.channel.get(model.ChannelId)
    }
    return model
  }
}
