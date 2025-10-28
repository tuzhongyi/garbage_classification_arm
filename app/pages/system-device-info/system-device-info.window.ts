import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class SystemDeviceInfoWindow {
  confirm = new ConfirmWindow()
  info = new InfomWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = ''
  args: any
}
class InfomWindow extends WindowModel {
  style = {
    width: '600px',
    height: '180px',
  }
  url: string = '../main-information-device/main-information-device.html'
}
