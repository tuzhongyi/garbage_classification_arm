import { ClassConstructor } from 'class-transformer'
import { EventEmitter } from '../../../common/event-emitter'
import { Language } from '../../../common/language'
import { MeshNode } from '../../../data-core/models/robot/mesh-node.model'
import { DeviceRobotTableEvent } from '../device-robot-config.event'

export class DeviceRobotConfigHtmlNodeTableController {
  event: EventEmitter<DeviceRobotTableEvent> = new EventEmitter()
  selected?: string
  constructor() {
    this.regist()
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement

  private widths = ['20%', '50%', '30%']

  private regist() {}

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

  private append(index: number, node: MeshNode) {
    let row = document.createElement('tr')
    row.id = `tr_${node.Id}`
    row.addEventListener('click', (e: MouseEvent) => {
      this.onrowclick(e)
    })

    let cell = document.createElement('td')
    cell.innerHTML = index.toString()
    row.appendChild(cell)

    cell = document.createElement('td')
    let div = document.createElement('div')
    div.className = 'td-type'
    let type = document.createElement('div')
    type.className = `td-type-color ${node.NodeType}`
    div.appendChild(type)
    let text = document.createElement('div')
    text.innerHTML = Language.MeshNodeType(node.NodeType)
    div.appendChild(text)
    cell.title = Language.MeshNodeType(node.NodeType)
    cell.appendChild(div)
    row.appendChild(cell)

    cell = document.createElement('td')
    cell.innerHTML = node.CanType ?? '-'
    row.appendChild(cell)

    this.tbody.appendChild(row)
  }

  private onrowclick(e: MouseEvent) {
    let tr = this.findelement(e.target as HTMLElement, HTMLTableRowElement)
    if (!tr) return
    let id = tr.id.split('_')[1]

    let selected = this.table.querySelector('.selected')
    if (selected) {
      selected.classList.remove('selected')
    }

    tr.classList.add('selected')

    this.selected = id
    this.event.emit('select', id)
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

  private clear() {
    this.tbody.innerHTML = ''
    this.selected = undefined
  }

  load(datas: MeshNode[]) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      this.append(i + 1, datas[i])
    }
  }
}
