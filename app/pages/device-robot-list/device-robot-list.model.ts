import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class DeviceRobotWindow {
  details = new DetailsWindow()
  discover = new DiscoverWindow()
  confirm = new ConfirmWindow()
}

class DetailsWindow extends WindowModel {
  clear() {
    this.id = undefined
  }
  id?: string
  style = {
    width: '600px',
    height: '440px',
  }
  url: string = '../device-robot-details/device-robot-details.html'
}
class DiscoverWindow extends WindowModel {
  style = {
    width: '75%',
    height: '75%',
  }
  url: string = '../device-robot-discover/device-robot-discover.html'
}

class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  id?: string
}
