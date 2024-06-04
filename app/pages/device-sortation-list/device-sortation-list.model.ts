import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class DeviceSortationWindow {
  details = new DetailsWindow()
  discover = new DiscoverWindow()
  confirm = new ConfirmWindow()
}

class DetailsWindow extends WindowModel {
  style = {
    width: '600px',
    height: '580px',
  }
  url: string = '../device-sortation-details/device-sortation-details.html'
}
class DiscoverWindow extends WindowModel {
  style = {
    width: '75%',
    height: '75%',
  }
  url: string = '../device-sortation-discover/device-sortation-discover.html'
}

class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  id?: string
}
