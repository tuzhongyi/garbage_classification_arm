import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { AIEventRuleEvent } from './ai-event-rule.event'

import './ai-event-rule.less'
import { DeviceChannelListTableController } from './controller/ai-event-rule-table.controller'
export class AIEventRuleHtmlController {
  table = new DeviceChannelListTableController()
  event: EventEmitter<AIEventRuleEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private element = {
    list: document.getElementById('list') as HTMLDivElement,
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
    this.element.list.addEventListener('click', (e) => {
      let selected = document.querySelector('.card.selected') as HTMLDivElement
      if (selected) {
        selected.classList.remove('selected')
      }

      let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
      if (card) {
        card.classList.add('selected')
        let type = card.getAttribute('type')
        if (type) {
          this.event.emit('eventchange', type)
        }
      }
    })
    this.element.button.create.addEventListener('click', () => {
      this.event.emit('create')
    })
    this.element.button.delete.addEventListener('click', () => {
      this.event.emit('delete', this.table.selecteds)
    })
  }
}
