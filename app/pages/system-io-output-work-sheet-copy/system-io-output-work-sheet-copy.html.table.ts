import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'

export class SystemIOOutputWorkSheetCopyHtmlTable {
  selecteds: IOOutputPort[] = []
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
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  private widths = ['42px', '50px']
  private datas: IOOutputPort[] = []
  private sourceId?: number

  private regist() {
    HtmlTool.table.checkall(
      this.element.thead.checkall,
      this.tbody,
      (ids, checked) => {
        if (checked) {
          let _ids = ids.map((id) => {
            return id.split('_')[1]
          })
          this.selecteds = this.datas.filter((x) =>
            _ids.includes(x.Id.toString())
          )
        } else {
          this.selecteds = []
        }
      }
    )
  }

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private append(id: string, item: string[]) {
    let row = document.createElement('tr')
    row.id = `tr_${id}`
    row.addEventListener('click', (e: MouseEvent) => {
      this.onrowclick(e)
    })
    let td = document.createElement('td')
    let checkbox = document.createElement('input')
    if (id === this.sourceId?.toString()) {
      checkbox.disabled = true
      checkbox.checked = true
    }
    checkbox.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      let checkbox = e.currentTarget as HTMLInputElement
      if (checkbox.disabled) return
      let id = checkbox.id.split('_')[1]
      let selected = this.datas.find((x) => x.Id.toString() === id)
      if (selected) {
        let index = this.selecteds.findIndex((x) => x.Id.toString() === id)
        if (checkbox.checked) {
          if (index < 0) {
            this.selecteds.push(selected)
          }
        } else {
          if (index >= 0) {
            this.selecteds.splice(index, 1)
          }
        }
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
    let selected = this.datas.find((x) => x.Id.toString() === id)

    let checkbox = document.querySelector(`#checkbox_${id}`) as HTMLInputElement
    checkbox.checked = !checkbox.checked
    if (selected) {
      let index = this.selecteds.findIndex((x) => x.Id.toString() === id)
      if (checkbox.checked) {
        if (index < 0) {
          this.selecteds.push(selected)
        }
      } else {
        if (index >= 0) {
          this.selecteds.splice(index, 1)
        }
      }
    }
  }

  clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  reload() {
    this.clear()
    this.load(this.datas)
  }

  async load(datas: IOOutputPort[], sourceId?: number) {
    this.datas = datas
    this.sourceId = sourceId

    for (let i = 0; i < this.datas.length; i++) {
      const item = this.datas[i]
      let values: string[] = [
        item.Id.toString(),
        item.Name ?? '',
        await EnumTool.IOState(item.State),
      ]
      this.append(item.Id.toString(), values)
    }
  }
}
