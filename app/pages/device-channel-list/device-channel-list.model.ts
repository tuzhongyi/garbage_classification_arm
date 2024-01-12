import { WindowModel } from '../window/window.model'

export class DeviceChannelWindow {
  details = new DetailsWindow()
  discover = new DiscoverWindow()
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
