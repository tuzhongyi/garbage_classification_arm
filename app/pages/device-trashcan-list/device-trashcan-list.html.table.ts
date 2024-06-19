import { EventEmitter } from '../../common/event-emitter'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { DeviceTrashCanListTableEvent } from './device-trashcan-list.event'
import { DeviceTrashCanModel } from './device-trashcan-list.model'

export class DeviceTrashCanListHtmlTable {
  event: EventEmitter<DeviceTrashCanListTableEvent> = new EventEmitter()
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

  private widths = [
    '60px',
    '10%',
    '10%',
    '10%',
    '10%',
    '20%',
    '200px',
    '10%',
    '10%',
  ]
  _sort?: Sort
  datas: DeviceTrashCanModel[] = []

  private regist() {
    HtmlTool.table.sort(this.thead, (sort) => {
      this._sort = sort
      this.reload()
    })
  }

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private append(id: string, item: string[]) {
    let row = document.createElement('tr')
    row.id = `tr_${id}`
    for (let i = 0; i < item.length; i++) {
      let cell = document.createElement('td')
      cell.innerText = item[i]
      cell.title = item[i]
      row.appendChild(cell)
    }
    let td = document.createElement('td')
    let operation = document.createElement('div')
    operation.className = 'operation'

    let btn_picture = document.createElement('div')
    btn_picture.title = `查看图片`
    btn_picture.className = 'button-icon'
    btn_picture.id = 'picture_' + id
    btn_picture.addEventListener('click', (e: MouseEvent) => {
      this.onpicture(e)
    })
    let i_picture = document.createElement('i')
    i_picture.className = 'howell-icon-picture'
    btn_picture.appendChild(i_picture)

    operation.appendChild(btn_picture)
    td.appendChild(operation)
    row.appendChild(td)

    this.tbody.appendChild(row)
  }

  private onpicture(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLDivElement
    )
    if (!div) return
    let id = div.id.split('_')[1]
    this.event.emit('picture', id)
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      let _a = a
      let _b = b
      switch (sort.active) {
        case 'HostAddress':
        case 'PortNo':
        case 'ProtocolType':
        case 'DeviceModel':
        case 'SerialNumber':
          _a = a.SourceChannel
          _b = b.SourceChannel
          break
        default:
          break
      }
      return LocaleCompare.compare(
        _a[sort.active],
        _b[sort.active],
        sort.direction === 'asc'
      )
    })
  }

  clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  reload() {
    this.clear()
    this.load(this.datas)
  }

  async load(datas: DeviceTrashCanModel[]) {
    this.datas = datas
    if (this._sort) {
      this.sort(this._sort)
    }
    for (let i = 0; i < this.datas.length; i++) {
      const item = this.datas[i]
      let channel = await item.channel
      let values: string[] = [
        HtmlTool.set(item.No ?? i + 1),
        await EnumTool.CanType(item.CanType),
        HtmlTool.set(item.Volume, '-'),
        await EnumTool.CoverState(item.CoverState),
        HtmlTool.set(item.Confidence, '-'),
        HtmlTool.set(channel ? channel.Name : '-'),
        HtmlTool.set(item.UpdateTime.format('yyyy-MM-dd HH:mm:ss')),
        item.NodeType ? await EnumTool.MeshNodeType(item.NodeType) : '-',
      ]

      this.append(item.SourceFrom ?? '', values)
    }
  }
}
