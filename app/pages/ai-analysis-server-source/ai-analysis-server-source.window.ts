import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export class AIAnalysisServerSourceWindow {
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  clear() {
    this.id = ''
  }
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  id: string = ''
}
