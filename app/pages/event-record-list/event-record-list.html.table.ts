import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { EventRecord } from '../../data-core/models/arm/events/event-record.model'
import { Page } from '../../data-core/models/page-list.model'
import { EventRecordListHtmlTableEvent } from './event-record-list.event'

declare const $: any
export class EventRecordListHtmlTable {
  constructor() {
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  event: EventEmitter<EventRecordListHtmlTableEvent> = new EventEmitter()
  private widths = ['auto', 'auto', 'auto', '15%', '10%']

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private appendTd(
    tr: HTMLTableRowElement,
    text: string,
    title: string = text
  ) {
    let td = document.createElement('td')
    td.innerText = text
    td.title = title
    tr.appendChild(td)
  }

  private appendOptionPicture(
    tr: HTMLTableRowElement,
    id: string,
    count: number = 0
  ) {
    let td = document.createElement('td')
    let operation = document.createElement('div')
    operation.className = 'operation'

    let btn_picture = document.createElement('div')
    btn_picture.title = `查看图片`
    btn_picture.className = 'button-icon'
    btn_picture.id = 'picture_' + id
    btn_picture.addEventListener('click', (e: MouseEvent) => {
      this.onresources(e)
    })
    let i_picture = document.createElement('i')
    i_picture.className = 'howell-icon-picture'
    btn_picture.appendChild(i_picture)

    let span_picture = document.createElement('span')
    span_picture.innerText = ` ${count}`
    btn_picture.appendChild(span_picture)

    operation.appendChild(btn_picture)
    td.appendChild(operation)
    tr.appendChild(td)
  }

  private async appendTr(tbody: HTMLTableSectionElement, data: EventRecord) {
    let row = document.createElement('tr')

    this.appendTd(row, await EnumTool.EventType(data.EventType, true))
    this.appendTd(
      row,
      data.Resources
        ? data.Resources.map((x) => x.ResourceName)
            .sort((a, b) => {
              return LocaleCompare.compare(a, b)
            })
            .join(', ')
        : ''
    )
    if (data.BeginTime && data.EndTime) {
      this.appendTd(
        row,
        `${data.BeginTime.format('yyyy-MM-dd HH:mm:ss')}-${data.EndTime.format(
          'HH:mm:ss'
        )}`
      )
    } else {
      this.appendTd(row, data.EventTime.format('yyyy-MM-dd HH:mm:ss'))
    }

    this.appendTd(row, HtmlTool.set(Language.Uploaded(data.Uploaded)))

    this.appendOptionPicture(row, `${data.Id}`, data.Resources?.length)
    tbody.appendChild(row)
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
  private onresources(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = HtmlTool.element.findelement(
      e.target as HTMLElement,
      HTMLDivElement
    )
    if (!div) return
    let id = div.id.split('_')[1]
    this.event.emit('resources', id)
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  async load(datas: EventRecord[], page: Page) {
    datas = datas.sort((a, b) => {
      return LocaleCompare.compare(a.EventTime.getTime(), b.EventTime.getTime())
    })
    for (let i = 0; i < datas.length; i++) {
      await this.appendTr(this.tbody, datas[i])
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
