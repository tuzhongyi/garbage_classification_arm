import { EventType } from '../../data-core/enums/event-type.enum'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { IWindowQuery, WindowModel } from '../window/window.model'

export class AIEventRuleWindow {
  details = new DetailsWindow()
  confirm = new ConfirmWindow()
}

interface DetailsWindowQuery extends IWindowQuery {
  id?: string
  type: EventType
}

class DetailsWindow extends WindowModel<DetailsWindowQuery> {
  clear() {
    this.query.id = undefined
  }
  style = {
    width: '65%',
    height: '700px',
  }
  url: string = '../ai-event-rule-details/ai-event-rule-details.html'
}
class ConfirmWindow extends ConfirmWindowModel<{}> {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  ids: string[] = []
}
