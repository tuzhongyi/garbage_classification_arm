import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { RunningStatus } from '../../data-core/models/arm/running-status.model'

declare const $: any
export class SystemStatusProcessHtmlTable {
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

  private widths = ['5%', '15%', '15%', '35%', '15%', '15%']

  init() {
    HtmlTool.table.appendColgroup(this.table, this.widths)
  }

  append(item: string[]) {
    HtmlTool.table.append(this.tbody, item)
  }

  load(data: RunningStatus) {
    let radio = (data.MemoryUsage / data.TotalMemory) * 100
    this.thead.MemoryUsage.innerHTML = radio.toFixed(radio === 100 ? 0 : 2)
    this.thead.CPUUsage.innerHTML = data.CPUUsage.toString()
    this.thead.NetworkSpeed.innerHTML = data.NetworkSpeed?.toString() ?? ''
    if (data.Processes) {
      for (let i = 0; i < data.Processes.length; i++) {
        const item = data.Processes[i]
        let values: string[] = [
          item.Id,
          item.CPUUsage?.toString(),
          item.MemoryUsage?.toString(),
          item.Name,
          item.NetworkSpeed?.toString() ?? '',
          item.State?.toString() ?? '',
        ]
        this.append(values)
      }
    }
  }
}
