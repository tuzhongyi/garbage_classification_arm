import { IasParamsWindowQuery } from '../ai-analysis-server-source-params/ai-analysis-server-source-params.model'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export class AIAnalysisServerSourceWindow {
  confirm = new ConfirmWindow()
  params = new IasParamsWindow()
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
class IasParamsWindow extends WindowModel<IasParamsWindowQuery> {
  constructor() {
    super()
    let width = window.innerWidth * 0.6
    let height = (width / 16) * 9 + 50 + 50 + 50
    this.style.width = `${width}px`
    this.style.height = `${height}px`
  }
  style = {
    width: '50%',
    height: '50%',
  }
  url: string =
    '../ai-analysis-server-source-params/ai-analysis-server-source-params.html'
}
