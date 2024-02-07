import { ClassConstructor } from 'class-transformer'
import { EventEmitter } from '../../../common/event-emitter'
import { CameraAIEventRule } from '../../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'

export interface DeviceChannelListTableEvent {
  modify: (id: string) => void
}

export class DeviceChannelListTableController {
  event: EventEmitter<DeviceChannelListTableEvent> = new EventEmitter()
  selecteds: string[] = ['50px', '80px', 'auto', 'auto', 'auto', '50px']
  constructor() {
    this.regist()
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private element = {
    thead: {
      checkall: document.getElementById('checkall') as HTMLInputElement,
    },
  }

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement

  private widths = []

  private regist() {
    this.element.thead.checkall.addEventListener('change', () => {
      this.tbody.querySelectorAll('input[type="checkbox"]').forEach((x) => {
        let checkbox = x as HTMLInputElement
        checkbox.checked = this.element.thead.checkall.checked
        let id = checkbox.id.split('_')[1]
        if (checkbox.checked) {
          if (!this.selecteds.includes(id)) {
            this.selecteds.push(id)
          }
        } else {
          if (this.selecteds.includes(id)) {
            this.selecteds.splice(this.selecteds.indexOf(id), 1)
          }
        }
      })
    })
  }

  private init() {
    let colgroup = document.createElement('colgroup')
    for (let i = 0; i < this.widths.length; i++) {
      const width = this.widths[i]
      let col = document.createElement('col')
      col.style.width = width
      colgroup.appendChild(col)
    }
    this.table.appendChild(colgroup)
    // $(this.table).tablesorter()
  }

  private append(id: string, item: string[]) {
    let row = document.createElement('tr')
    row.id = `tr_${id}`
    row.addEventListener('click', (e: MouseEvent) => {
      this.onrowclick(e)
    })
    let td = document.createElement('td')
    let checkbox = document.createElement('input')
    checkbox.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      let checkbox = e.target as HTMLInputElement
      let id = checkbox.id.split('_')[1]
      if (checkbox.checked) {
        this.selecteds.push(id)
      } else {
        this.selecteds.splice(this.selecteds.indexOf(id), 1)
      }
    })
    checkbox.type = 'checkbox'
    checkbox.id = 'checkbox_' + id
    td.appendChild(checkbox)
    row.appendChild(td)
    for (let i = 0; i < item.length; i++) {
      let cell = document.createElement('td')
      cell.innerText = item[i]
      cell.title = item[i]
      row.appendChild(cell)
    }
    td = document.createElement('td')
    td.className = 'operation'
    let btn = document.createElement('div')
    btn.className = 'button-icon'
    btn.id = 'modify_' + id
    btn.addEventListener('click', (e: MouseEvent) => {
      this.onmodify(e)
    })
    let i = document.createElement('i')
    i.className = 'howell-icon-modification'
    btn.appendChild(i)
    td.appendChild(btn)
    row.appendChild(td)

    this.tbody.appendChild(row)
  }

  private onrowclick(e: MouseEvent) {
    let tr = this.findelement(e.target as HTMLElement, HTMLTableRowElement)
    if (!tr) return
    let id = tr.id.split('_')[1]
    let checkbox = document.querySelector(`#checkbox_${id}`) as HTMLInputElement
    checkbox.checked = !checkbox.checked
    if (checkbox.checked) {
      if (!this.selecteds.includes(id)) {
        this.selecteds.push(id)
      }
    } else {
      if (this.selecteds.includes(id)) {
        this.selecteds.splice(this.selecteds.indexOf(id), 1)
      }
    }
  }

  private findelement<T extends HTMLElement>(
    e: HTMLElement | null,
    cls: ClassConstructor<T>
  ): T | null {
    if (!e) return null
    if (e instanceof cls) {
      return e
    }
    return this.findelement(e.parentElement, cls)
  }

  private onmodify(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = this.findelement(e.target as HTMLElement, HTMLDivElement)
    if (!div) return
    let id = div.id.split('_')[1]
    this.event.emit('modify', id)
  }

  private clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  load(datas: CameraAIEventRule[]) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      let values: string[] = [
        (i + 1).toString(),
        item.RuleName,
        item.ChannelName ?? '-',
        item.ModelName ?? '-',
      ]
      this.append(item.RuleId, values)
    }
  }
}
