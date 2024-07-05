import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { FrpInfo } from '../../data-core/models/frp-info/frp-info.model'
import { NetworkFrpListTableEvent } from './network-frp-list.event'

export class NetworkFrpListHtmlTable {
  event: EventEmitter<NetworkFrpListTableEvent> = new EventEmitter()
  selecteds: string[] = []
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

  private widths = [
    '60px',
    '20%',
    '10%',
    '10%',
    '10%',
    '10%',
    '200px',
    '10%',
    '10%',
  ]
  _sort?: Sort
  datas: FrpInfo[] = []

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

    let btn_delete = document.createElement('div')
    btn_delete.title = `删除`
    btn_delete.className = 'button-icon'
    btn_delete.id = 'delete_' + id
    btn_delete.addEventListener('click', (e: MouseEvent) => {
      this.ondelete(e)
    })
    let i_delete = document.createElement('i')
    i_delete.className = 'howell-icon-delete2'
    btn_delete.appendChild(i_delete)

    operation.appendChild(btn_delete)
    td.appendChild(operation)
    row.appendChild(td)

    this.tbody.appendChild(row)
  }

  private ondelete(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLDivElement
    )
    if (!div) return
    let id = div.id.split('_')[1]
    this.event.emit('delete', id)
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      let _a = a
      let _b = b
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

  async load(datas: FrpInfo[]) {
    this.datas = datas
    if (this._sort) {
      this.sort(this._sort)
    }
    for (let i = 0; i < this.datas.length; i++) {
      const item = this.datas[i]
      let values: string[] = [
        HtmlTool.set(i + 1),
        HtmlTool.set(item.Name),
        HtmlTool.set(item.Localhost, '-'),
        HtmlTool.set(item.LocalPort, '-'),
        HtmlTool.set(item.RemotePort, '-'),
        HtmlTool.set(Language.NetworkProtocol(item.Protocol), '-'),
        HtmlTool.set(item.CreationTime?.format('yyyy-MM-dd HH:mm:ss')),
        HtmlTool.set(Language.OnlineStatus(item.State), '-'),
      ]

      this.append(item.Id?.toString() ?? '', values)
    }
  }
}
