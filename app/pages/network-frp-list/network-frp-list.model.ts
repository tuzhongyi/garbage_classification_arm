import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class NetworkFrpListWindow {
  details = new DetailsWindow()
  confirm = new ConfirmWindow()
}

class DetailsWindow extends WindowModel {
  style = {
    width: '600px',
    height: '340px',
  }
  url: string = '../network-frp-details/network-frp-details.html'
}

class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  id?: string
}
