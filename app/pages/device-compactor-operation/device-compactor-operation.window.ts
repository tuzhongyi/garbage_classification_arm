import { CompactorCommandType } from '../../data-core/enums/compactor/compactor-command-type.enum'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export class DeviceCompactorOperationWindow {
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.command = undefined
    this.start = undefined
    this.stop = undefined
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = ''
  command?: CompactorCommandType
  start?: boolean
  stop?: boolean
}
