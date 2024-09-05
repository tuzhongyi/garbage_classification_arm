import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { IOOutputWorkSheet } from '../../data-core/models/arm/io/io-output-work-sheet.model'
import { SystemIOOutputWorkSheetCopyQuery } from '../system-io-output-work-sheet-copy/system-io-output-work-sheet-copy.model'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class SystemIOOutputWindow {
  confirm = new ConfirmWindow()
  copy = new CopyWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.data = undefined
    this.message = ''
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = ''
  args: any
  data?: {
    port: IOOutputPort
    sheet: IOOutputWorkSheet
  }
}

class CopyWindow extends WindowModel<SystemIOOutputWorkSheetCopyQuery> {
  style = {
    width: '600px',
    height: '400px',
  }
  url =
    '../system-io-output-work-sheet-copy/system-io-output-work-sheet-copy.html'
}
