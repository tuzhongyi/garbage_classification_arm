import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { MajorType } from '../../data-core/enums/robot/major-type.enum'
import { Page } from '../../data-core/models/page-list.model'
import { LogItem } from '../../data-core/models/robot/robot-log-item.model'
import { DeviceRobotLogHtmlTableEvent } from './device-robot-log.event'

declare const $: any
export class DeviceRobotLogHtmlTable {
  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement
  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement
  event: EventEmitter<DeviceRobotLogHtmlTableEvent> = new EventEmitter()
  private widths = ['50px']

  init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  append(item: string[]) {
    HtmlTool.table.append(this.tbody, item)
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  load(datas: LogItem[], page: Page) {
    this.clear()
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      let value: string[] = [
        (i + 1).toString(),
        item.Time.format('yyyy-MM-dd HH:mm:ss'),
        Language.MajorType(item.Major as MajorType),
        item.Minor,
        item.User ?? '-',
        item.Remote ?? '-',
        item.Desc ?? '',
      ]
      this.append(value)
    }
    // $('.Pagination').pagination({
    //   current: page.PageIndex,
    //   pageCount: page.PageCount,
    //   jump: true,
    //   prev_text: '上一页',
    //   next_text: '下一页',
    // })
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
