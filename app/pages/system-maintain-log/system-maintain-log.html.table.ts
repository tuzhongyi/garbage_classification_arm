declare const $: any
export class SystemMaintainLogHtmlTable {
  constructor() {
    this.init()
  }
  table = document.getElementById('table') as HTMLTableElement
  tbody = document.querySelector('#table tbody') as HTMLTableSectionElement

  private widths = []

  init() {
    let colgroup = document.createElement('colgroup')
    for (let i = 0; i < this.widths.length; i++) {
      const width = this.widths[i]
      let col = document.createElement('col')
      col.style.width = width
      colgroup.appendChild(col)
    }
    this.table.appendChild(colgroup)
    // $(this.table).tablesorter()
  }

  append(item: string[]) {
    let row = document.createElement('tr')
    for (let i = 0; i < item.length; i++) {
      let cell = document.createElement('td')
      cell.innerText = item[i]
      cell.title = item[i]
      row.appendChild(cell)
    }
    this.tbody.appendChild(row)
  }

  load() {}
}
