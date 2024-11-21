import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { VideoSource } from '../../data-core/models/arm/analysis/video-source.model'
interface AIAnalysisServerSourceTableEvent {
  delete(id: string): void
  modify(id: string): void
}
declare const $: any
export class AIAnalysisServerSourceHtmlTable {
  event = new EventEmitter<AIAnalysisServerSourceTableEvent>()
  constructor() {
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
    '50px',
    'auto',
    '150px',
    '7.5%',
    '5%',
    '7.5%',
    '7.5%',
    '10%',
    '7.5%',
    '10%',
    '10%',
  ]
  private datas: VideoSource[] = []

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
    HtmlTool.table.sort(this.thead, (sort) => {
      this.datas = this.sort(sort, this.datas)
      this.reload()
    })
  }

  private sort(sort: Sort, datas: VideoSource[]) {
    return datas.sort((a: any, b: any) => {
      return LocaleCompare.compare(
        a[sort.active],
        b[sort.active],
        sort.direction == 'asc'
      )
    })
  }

  private append(id: string, items: string[]) {
    HtmlTool.table.append(this.tbody, items, [
      {
        inner: `<i class="howell-icon-modification"></i>`,
        id: `modify_${id}`,
        click: (args) => {
          let id = args.button.id.replace('modify_', '')
          this.event.emit('modify', id)
        },
      },
      {
        inner: `<i class="howell-icon-delete2"></i>`,
        id: `del_${id}`,
        click: (args) => {
          let id = args.button.id.replace('del_', '')
          this.event.emit('delete', id)
        },
      },
    ])
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  reload() {
    this.clear()
    this.load(this.datas)
  }

  async load(datas: VideoSource[] = []) {
    this.datas = datas
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i]
      let items = [
        (i + 1).toString(),
        HtmlTool.set(data.Name),
        HtmlTool.set(data.IPAddress),
        HtmlTool.set(data.Port),
        HtmlTool.set(data.Channel),
        Language.StreamType(data.StreamType),
        Language.DeviceType(data.DeviceType),
        HtmlTool.set(
          await EnumTool.server.analysis.VideoSourceProtocolType(
            data.ProtocolType
          )
        ),
        HtmlTool.set(await EnumTool.server.analysis.VideoSourceMode(data.Mode)),
        HtmlTool.set(data.Vendor, '-'),
      ]
      this.append(data.Id, items)
    }
  }
}
