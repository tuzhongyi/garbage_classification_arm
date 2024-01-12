import { WindowModel } from '../window/window.model'

export class DeviceChannelWindow {
  details = new DetailsWindow()
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
