import { EventEmitter } from '../../../../common/event-emitter'
import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'
import { MeshNode } from '../../../../data-core/models/robot/mesh-node.model'
import { DeviceRobotTableEvent } from '../../device-robot-calibration.event'

export class DeviceRobotCalibrationHtmlNodeTableController {
  event: EventEmitter<DeviceRobotTableEvent> = new EventEmitter()
  selected?: string
  constructor() {
    this.parent = this.table.parentElement as HTMLDivElement
    this.regist()
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  parent: HTMLDivElement

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement

  private widths = ['20%', '50%', '30%']
  private disabled = false

  private regist() {}

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private async append(node: MeshNode) {
    let row = document.createElement('tr')
    row.id = `tr_${node.Id}`
    row.addEventListener('click', (e: MouseEvent) => {
      this.onrowclick(e)
    })

    let cell = document.createElement('td')
    cell.innerHTML = node.Id
    row.appendChild(cell)

    cell = document.createElement('td')
    let div = document.createElement('div')
    div.className = 'td-type'
    let type = document.createElement('div')
    type.className = `td-type-color ${node.NodeType}`
    div.appendChild(type)
    let text = document.createElement('div')
    text.innerHTML = node.Name
    div.appendChild(text)
    cell.title = await EnumTool.robot.MeshNodeType(node.NodeType)
    cell.appendChild(div)
    row.appendChild(cell)

    cell = document.createElement('td')
    cell.innerHTML = node.CanType
      ? await EnumTool.trashcan.CanType(node.CanType)
      : '-'
    row.appendChild(cell)

    this.tbody.appendChild(row)
  }

  private onrowclick(e: MouseEvent) {
    if (this.disabled) return
    let tr = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLTableRowElement
    )
    if (!tr) return
    let id = tr.id.split('_')[1]

    this.select(id, tr)
  }

  private clear() {
    this.tbody.innerHTML = ''
    this.selected = undefined
  }

  async load(datas: MeshNode[]) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      await this.append(datas[i])
    }
  }

  select(id: string, tr?: HTMLTableRowElement) {
    if (this.disabled) return
    this.selected = id
    let selected = this.table.querySelector('.selected')
    if (selected) {
      selected.classList.remove('selected')
    }
    if (!tr) {
      tr = document.getElementById(`tr_${id}`) as HTMLTableRowElement
      this.parent.scrollTo({
        top: this.heightToTop(tr),
        behavior: 'smooth',
      })
    }
    tr.classList.add('selected')
    this.event.emit('select', id)
  }

  heightToTop(ele: HTMLElement) {
    //ele为指定跳转到该位置的DOM节点
    let root = document.body
    let height = 0
    do {
      height += ele.offsetTop - 40
      ele = ele.offsetParent as HTMLElement
    } while (ele !== root)
    return height
  }

  disable(is: boolean) {
    this.disabled = is
    if (is) {
      this.table.classList.add('disabled')
    } else {
      this.table.classList.remove('disabled')
    }
  }
}
