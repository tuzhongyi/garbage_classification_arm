import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { PictureWindowModel } from '../window-picture/window-picture.model'

export class DeviceDropPortModel extends DropPortConfig {
  channel?: Promise<InputProxyChannel | undefined>
}

export class DeviceDropPortListWindow {
  picture = new PictureWindow()
}

class PictureWindow extends PictureWindowModel {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../window-picture/window-picture.html'
}
