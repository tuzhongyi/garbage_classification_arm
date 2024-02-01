import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class DeviceChannelListWindow {
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
    height: '600px',
  }
  url: string = '../device-channel-details/device-channel-details.html'
}
class DiscoverWindow extends WindowModel {
  style = {
    width: '75%',
    height: '75%',
  }
  url: string = '../device-channel-discover/device-channel-discover.html'
}
class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  ids: string[] = []
}
