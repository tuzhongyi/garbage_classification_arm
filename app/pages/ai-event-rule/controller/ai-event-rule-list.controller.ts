import { EventEmitter } from '../../../common/event-emitter'
import { HtmlTool } from '../../../common/tools/html-tool/html.tool'
import { EventType } from '../../../data-core/enums/event-type.enum'
import { EnumNameValue } from '../../../data-core/models/capabilities/enum-name-value.model'
import { Manager } from '../../../data-core/requests/managers/manager'

export interface AIEventRuleTableEvent {
  change: (type: EventType) => void
}

export class AIEventRuleListController {
  event = new EventEmitter<AIEventRuleTableEvent>()
  constructor() {
    this.init()
    this.regist()
  }
  private element = {
    list: document.getElementById('list') as HTMLDivElement,
    template: document.getElementById('template-card') as HTMLTemplateElement,
  }

  private icons: { [key: string]: string } = {
    1: 'howell-icon-garbagebags',
    2: 'howell-icon-mixlittering',
    9: 'howell-icon-nolittering',
    5: 'howell-icon-garbage_ground',
  }
  private inited = false

  private init() {
    Manager.capability.depolyment
      .then((x) => {
        if (x.EventTypes) {
          this.element.list.innerHTML = ''
          let index = 0
          x.EventTypes.forEach((y) => {
            let icon = this.icons[y.Value]
            if (icon) {
              let card = this.create(y, icon)
              if (index === 0) {
                card.classList.add('selected')
              }
              this.element.list.appendChild(card)
              index++
            }
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }

  private regist() {}

  private create(type: EnumNameValue, icon: string) {
    let node = this.element.template.content.cloneNode(true) as HTMLElement

    let card = node.querySelector('.card') as HTMLElement
    card.setAttribute('type', type.Value)
    card.addEventListener('click', (e) => {
      this.onclick(e)
    })

    let _icon = node.querySelector('.card-icon') as HTMLElement
    _icon.className = icon
    let name = node.querySelector('.card-name') as HTMLElement
    name.innerHTML = type.Name

    return card
  }

  private onclick(e: MouseEvent) {
    let selected = document.querySelector('.card.selected') as HTMLDivElement
    if (selected) {
      selected.classList.remove('selected')
    }

    let card = HtmlTool.element.findelement(e.target as HTMLElement, 'card')
    if (card) {
      card.classList.add('selected')
      let type = card.getAttribute('type')
      if (type) {
        this.event.emit('change', type)
      }
    }
  }
}
