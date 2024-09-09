import { IOState } from '../../data-core/enums/io/io-state.enum'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'
import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { Polygon } from '../../data-core/models/arm/polygon.model'

export class DeviceDropPortDetailsCreater {
  static Polygon() {
    let data = new Polygon()
    data.Coordinates = []
    return data
  }

  static DropPortConfig(channelId: string) {
    let data = new DropPortConfig()
    data.ChannelId = parseInt(channelId)
    data.TrashCanArea = this.Polygon()
    data.DefaultIOState = IOState.Low
    data.FullIOState = IOState.High
    data.DropPortType = CanType.Dry
    return data
  }
}
