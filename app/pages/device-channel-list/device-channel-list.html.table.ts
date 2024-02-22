import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelListTableEvent } from './device-channel-list.event'

export class DeviceChannelListHtmlTable {
  event: EventEmitter<DeviceChannelListTableEvent> = new EventEmitter()
  selecteds: string[] = []
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

  private widths = ['42px', '60px']

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

  private onmodify(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLDivElement
    )
    if (!div) return
    let id = div.id.split('_')[1]
    this.event.emit('modify', id)
  }

  private clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  async load(datas: InputProxyChannel[]) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      let values: string[] = [
        item.Id.toString(),
        item.Name,
        item.SourceChannel.HostAddress,
        item.SourceChannel.PortNo.toString(),
        item.SourceChannel.ProtocolType,
        item.SourceChannel.DeviceModel ?? '',
        item.SourceChannel.SerialNumber ?? '-',
        await Language.ProxyChannelState(item.ChannelState),
        item.SourceChannel.WebPortNo?.toString() ?? '-',
        Language.ChannelPositionNo(item.PositionNo),
      ]
      this.append(item.Id.toString(), values)
    }
  }
}
