import { HtmlTool } from '../../common/tools/html-tool/html.tool'

declare const $: any
export class SystemMaintainLogHtmlTable {
  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement
  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement

  private widths = []

  init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  append(item: string[]) {
    HtmlTool.table.append(this.tbody, item)
  }

  load() {}
}
