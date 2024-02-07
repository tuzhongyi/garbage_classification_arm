import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { RobotSearchResult } from '../../data-core/models/robot/robot-search-result.model'

export class DeviceRobotDiscoverHtmlTable {
  selecteds: string[] = []
  constructor() {
    this.regist()
    this.init()
  }

  private table = document.getElementById('table') as HTMLTableElement
  private thead = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement

  element = {
    thead: {
      checkall: document.getElementById('checkall') as HTMLInputElement,
    },
  }

  private widths = ['50px', '100px']

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
    this.initColGroup()
    // $(this.table).tablesorter()
  }

  private initColGroup() {
    let colgroup = document.createElement('colgroup')
    for (let i = 0; i < this.widths.length; i++) {
      const width = this.widths[i]
      let col = document.createElement('col')
      col.style.width = width
      colgroup.appendChild(col)
    }
    this.table.appendChild(colgroup)
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

    this.tbody.appendChild(row)
  }

  private onrowclick(e: MouseEvent) {
    let tr = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLTableRowElement
    )
    if (!tr) return
    let id = tr.id.split('_')[1]
    let checkbox = document.getElementById(`checkbox_${id}`) as HTMLInputElement
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

  clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  load(datas: RobotSearchResult[]) {
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      let values: string[] = [
        (i + 1).toString(),
        item.HostAddress,
        item.PortNo.toString(),
        item.DeviceType,
        item.ProtocolType,
        item.SerialNumber ?? '-',
      ]
      this.append(item.HostAddress, values)
    }
  }
}
