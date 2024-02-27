import { EventEmitter } from '../../../../common/event-emitter'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'

export interface DeviceChannelCalibrationTableHtmlEvent {
  selectPoint(id: string): void
  selectArea(id: string): void
  removePoint(id: string): void
  removeArea(id: string): void
}

export class DeviceChannelCalibrationTableHtmlController {
  event = new EventEmitter<DeviceChannelCalibrationTableHtmlEvent>()

  constructor() {
    this.parent = this.table.parentElement as HTMLDivElement
    this.init()
  }

  private widths = ['100px', 'auto', '130px']
  private table = document.getElementById('table') as HTMLTableElement
  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private parent: HTMLDivElement

  private initColGroup() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private init() {
    this.initColGroup()
  }

  append(id: string, texts: string[], option?: string) {
    let row = document.createElement('tr')
    row.id = `tr_${id}`
    row.addEventListener('click', (e: MouseEvent) => {
      let tr = HtmlTool.element.findelement(
        e.target as HTMLElement,
        HTMLTableRowElement
      )
      this.rowclick(tr as HTMLTableRowElement)
    })
    for (let i = 0; i < texts.length; i++) {
      let cell = document.createElement('td')
      cell.title = texts[i]
      cell.innerText = texts[i]
      row.appendChild(cell)
    }

    if (option !== undefined) {
      let cell = document.createElement('td')
      cell.title = option
      let div = document.createElement('div')
      div.className = 'option'

      let text = document.createElement('span')
      text.innerHTML = option

      div.appendChild(text)

      let btn = document.createElement('div')
      btn.className = 'btn'
      let i = document.createElement('i')
      i.className = 'howell-icon-Close'
      btn.appendChild(i)
      btn.addEventListener('click', (e: MouseEvent) => {
        let tr = HtmlTool.element.findelement(
          e.target as HTMLElement,
          HTMLTableRowElement
        ) as HTMLTableRowElement
        tr.remove()

        let typeandid = tr.id.split('_')[1]

        if (typeandid.includes('area')) {
          let id = typeandid.substring(4, typeandid.length)
          this.event.emit('removeArea', id)
        } else if (typeandid.includes('point')) {
          let id = typeandid.substring(5, typeandid.length)
          this.event.emit('removePoint', id)
        } else {
        }
      })

      div.appendChild(btn)
      cell.appendChild(div)
      row.appendChild(cell)
    }

    this.tbody.appendChild(row)
  }

  select(id: string) {
    let tr = document.getElementById(`tr_${id}`) as HTMLTableRowElement
    this.parent.scrollTo({
      top: this.heightToTop(tr),
      behavior: 'smooth',
    })
    this.rowclick(tr)
  }

  private rowclick(tr: HTMLTableRowElement) {
    let selected = this.table.querySelector('.selected') as HTMLElement
    if (selected) {
      selected.classList.remove('selected')
    }

    tr.classList.add('selected')

    let typeandid = tr.id.split('_')[1]

    if (typeandid.includes('area')) {
      let id = typeandid.substring(4, typeandid.length)
      this.event.emit('selectArea', id)
    } else if (typeandid.includes('point')) {
      let id = typeandid.substring(5, typeandid.length)
      this.event.emit('selectPoint', id)
    } else {
    }
  }

  private heightToTop(ele: HTMLElement) {
    //ele为指定跳转到该位置的DOM节点
    let root = document.body
    let height = 0
    do {
      height += ele.offsetTop - 40
      ele = ele.offsetParent as HTMLElement
    } while (ele !== root)
    return height
  }

  clear() {
    this.tbody.innerHTML = ''
  }

  remove(id: string) {
    let tr = this.table.querySelector(`#${id}`) as HTMLElement
    if (tr) {
      tr.remove()
    }
  }
}
