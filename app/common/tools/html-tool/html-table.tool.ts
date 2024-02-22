import { HTMLTableElementSortTool, Sort } from './html-table-sort.tool'

export class HTMLTableElementTool {
  private _sort = new HTMLTableElementSortTool()
  appendColgroup(table: HTMLTableElement, widths: string[] = []) {
    let colgroup = document.createElement('colgroup')
    for (let i = 0; i < widths.length; i++) {
      const width = widths[i]
      let col = document.createElement('col')
      col.style.width = width
      colgroup.appendChild(col)
    }
    table.appendChild(colgroup)
  }
  append(tbody: HTMLTableSectionElement, item: string[]) {
    let row = document.createElement('tr')
    for (let i = 0; i < item.length; i++) {
      let cell = document.createElement('td')
      cell.innerText = item[i]
      cell.title = item[i]
      row.appendChild(cell)
    }
    tbody.appendChild(row)
  }

  checkall(
    checkbox: HTMLInputElement,
    tbody: HTMLTableSectionElement,
    callback?: (ids: string[], checked: boolean) => void
  ) {
    checkbox.addEventListener('change', (e) => {
      let checkall = e.target as HTMLInputElement
      let ids: string[] = []
      tbody.querySelectorAll('input[type="checkbox"]').forEach((x) => {
        let checkbox = x as HTMLInputElement
        checkbox.checked = checkall.checked
        ids.push(checkbox.id)
      })
      if (callback) {
        callback(ids, checkall.checked)
      }
    })
  }

  sort(thead: HTMLTableSectionElement, callback?: (args: Sort) => void) {
    this._sort.sort(thead, callback)
  }
}
