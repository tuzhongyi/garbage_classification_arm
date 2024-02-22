import { EventEmitter } from '../../common/event-emitter'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { VideoSourceDescriptor } from '../../data-core/models/arm/video-source-descriptor.model'

export interface DeviceChannelDiscoverTableEvent {
  sort(sort: Sort): void
}

export class DeviceChannelDiscoverHtmlTable {
  selecteds: string[] = []
  event = new EventEmitter<DeviceChannelDiscoverTableEvent>()
  constructor() {
    this.regist()
    this.init()
  }

  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  private element = {
    thead: {
      checkall: document.getElementById('checkall') as HTMLInputElement,
    },
  }

  private widths = ['5%', '5%', '10%', '10%', '10%', '10%', '10%', '25%', '15%']

  private regist() {
    HtmlTool.table.checkall(
      this.element.thead.checkall,
      this.tbody,
      (ids, checked) => {
        if (checked) {
          this.selecteds = ids.map((id) => {
            return id.split('_')[1]
          })
        } else {
          this.selecteds = []
        }
      }
    )
    HtmlTool.table.sort(this.thead, (x) => {
      this.event.emit('sort', x)
    })
  }

  private init() {
    this.initColGroup()
    // $(this.table).tablesorter()
  }

  private initColGroup() {
    HtmlTool.table.appendColgroup(this.table, this.widths)
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

  clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  load(datas: VideoSourceDescriptor[]) {
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      let values: string[] = [
        (i + 1).toString(),
        item.HostAddress,
        item.PortNo.toString(),
        item.ChannelNumber.toString(),
        item.DeviceModel ?? '-',
        item.ProtocolType,
        item.SerialNumber ?? '-',
        item.MACAddress ?? '-',
      ]
      this.append(item.Id.toString(), values)
    }
  }
}
