import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { RobotTrashCan } from '../../data-core/models/robot/robot-trash-can.model'
import { PictureWindowModel } from '../window-picture/window-picture.model'

export class DeviceTrashCanModel extends RobotTrashCan {
  channel?: Promise<InputProxyChannel | undefined>
}

export class DeviceTrashCanListWindow {
  picture = new PictureWindow()
}

class PictureWindow extends PictureWindowModel {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../window-picture/window-picture.html'
}
