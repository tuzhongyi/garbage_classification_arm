import { EventEmitter } from '../../common/event-emitter'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { TrashCanRecord } from '../../data-core/models/arm/analysis/trash-can-record'
import { Page } from '../../data-core/models/page-list.model'
import { MeshDestination } from '../../data-core/models/robot/mesh-destination.model'
import { DeviceTrashCanLogHtmlTableEvent } from './device-trashcan-log.event'

declare const $: any
export class DeviceTrashCanLogHtmlTable {
  constructor() {
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  event: EventEmitter<DeviceTrashCanLogHtmlTableEvent> = new EventEmitter()
  private widths = [
    '100px',
    '100px',
    'auto',
    '150px',
    '100px',
    '100px',
    '100px',

    'auto',
  ]

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private format(datas?: MeshDestination[]) {
    if (!datas || datas.length === 0) return ''
    return datas.map((data) => data.Id).join(' — ')
  }

  private async appendTd(
    tr: HTMLTableRowElement,
    text: string,
    title: string = text
  ) {
    let td = document.createElement('td')
    td.innerText = text
    td.title = title
    tr.appendChild(td)
  }

  private async appendTr(tbody: HTMLTableSectionElement, data: TrashCanRecord) {
    let row = document.createElement('tr')

    this.appendTd(row, data.Time.format('HH:mm:ss'))
    this.appendTd(row, await EnumTool.TrashCanRecordType(data.RecordType))
    this.appendTd(row, HtmlTool.set(data.RobotName, '-'), data.RobotId)
    this.appendTd(row, this.format(data.Destinations))
    this.appendTd(row, HtmlTool.set(data.Weight, '-'))
    this.appendTd(row, await EnumTool.CanType(data.CanType))
    this.appendTd(row, data.Send ? '成功' : '失败')
    this.appendTd(
      row,
      `${HtmlTool.set(data.CommandId)}.结果:${
        (HtmlTool.set(data.CommandResult), '无')
      }.描述:${HtmlTool.set(data.CommandDesc, '无')}`
    )
    this.appendTd(row, HtmlTool.set(data.Description, '-'))
    tbody.appendChild(row)
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  load(datas: TrashCanRecord[], page: Page) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      this.appendTr(this.tbody, datas[i])
    }
    $('#pagination').paging({
      pageNum: page.PageIndex, // 当前页面
      totalNum: page.PageCount, // 总页码
      totalList: page.TotalRecordCount, // 记录总数量
      callback: (num: number) => {
        this.event.emit('page', num)
      },
    })
  }
}
