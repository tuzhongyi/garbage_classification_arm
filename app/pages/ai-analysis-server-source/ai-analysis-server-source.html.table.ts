import { Language } from '../../common/language'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { VideoSource } from '../../data-core/models/arm/analysis/video-source.model'

declare const $: any
export class AIAnalysisServerSourceHtmlTable {
  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement
  thead = {
    CPUUsage: document.getElementById('head_CPUUsage') as HTMLSpanElement,
    MemoryUsage: document.getElementById('head_MemoryUsage') as HTMLSpanElement,
    NetworkSpeed: document.getElementById(
      'head_NetworkSpeed'
    ) as HTMLSpanElement,
  }

  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement

  private widths = ['50px']

  init() {
    HtmlTool.table.appendColgroup(this.table, this.widths)
  }

  append(item: string[]) {
    HtmlTool.table.append(this.tbody, item)
  }

  load(datas: VideoSource[] = []) {
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
        HtmlTool.set(data.ProtocolType),
        HtmlTool.set(data.Mode),
        HtmlTool.set(data.Vendor),
      ]
      this.append(items)
    }
  }
}
