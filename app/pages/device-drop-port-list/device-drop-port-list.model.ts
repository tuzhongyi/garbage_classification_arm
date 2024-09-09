import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { WindowModel } from '../window/window.model'

export class DeviceDropPortModel extends DropPortConfig {
  channel?: Promise<InputProxyChannel | undefined>
}

export class DeviceDropPortListWindow {
  picture = new PictureWindow()
  details = new DetailsWindow()
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.id = undefined
    this.message = ''
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = ''
  args: any
  id?: number
}

class PictureWindow extends PictureWindowModel {
  style = {
    width: '50%',
    height: '50%',
  }
  url: string = '../window-picture/window-picture.html'
}

class DetailsWindow extends WindowModel {
  style = {
    width: '65%',
    height: '700px',
  }
  url: string = '../device-drop-port-details/device-drop-port-details.html'
}
