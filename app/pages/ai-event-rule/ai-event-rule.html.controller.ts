import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { AIEventRuleEvent } from './ai-event-rule.event'

import './ai-event-rule.less'
import { AIEventRuleListController } from './controller/ai-event-rule-list.controller'
import { AIEventRuleTableController } from './controller/ai-event-rule-table.controller'
export class AIEventRuleHtmlController {
  table = new AIEventRuleTableController()
  list = new AIEventRuleListController()
  event: EventEmitter<AIEventRuleEvent> = new EventEmitter()

  constructor() {
    this.init()
    this.regist()
  }

  private element = {
    search: {
      text: document.getElementById('search_text') as HTMLInputElement,
      button: document.getElementById('search_button') as HTMLButtonElement,
    },
    button: {
      create: document.getElementById('btn_create') as HTMLButtonElement,
      delete: document.getElementById('btn_delete') as HTMLButtonElement,
    },
  }

  init() {}

  private regist() {
    this.list.event.on('change', (type) => {
      this.event.emit('eventchange', type)
    })
    this.element.button.create.addEventListener('click', () => {
      this.event.emit('create')
    })
    this.element.button.delete.addEventListener('click', () => {
      this.event.emit('delete', this.table.selecteds)
    })
  }
}
