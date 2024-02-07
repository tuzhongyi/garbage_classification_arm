import { EventEmitter } from '../../../../common/event-emitter'
import { TimeControl } from '../../../../common/tools/controls/time-control/time-control'
import { Duration } from '../../../../common/tools/date-time-tool/duration.model'
import { HtmlTool } from '../../../../common/tools/html-tool/html.tool'

export interface AIEventDeploymentSheetHtmlEvent {
  remove(index: number): void
  weekchange(week: number): void
  add(week: number): void
  beginchange(args: { index: number; time: Date }): void
  endchange(args: { index: number; time: Date }): void
  copy(week: number): void
}

export class AIEventDeploymentSheetHtmlController {
  event: EventEmitter<AIEventDeploymentSheetHtmlEvent> = new EventEmitter()
  constructor() {
    this.regist()
  }
  private element = {
    copyto: document.getElementById('copyto') as HTMLButtonElement,
    week: document.getElementById('week') as HTMLSelectElement,
    sheet: document.getElementById('WeekSheet') as HTMLDivElement,
    add: document.querySelector('.sheet-week-button') as HTMLDivElement,
    times: [] as {
      begin: TimeControl
      end: TimeControl
    }[],
  }

  private regist() {
    this.element.week.addEventListener('change', () => {
      this.event.emit('weekchange', parseInt(this.element.week.value))
    })
    this.element.add.addEventListener('click', () => {
      this.event.emit('add', parseInt(this.element.week.value))
    })
    this.element.copyto.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      this.event.emit('copy', parseInt(this.element.week.value))
    })
  }

  private append(id: number, duration: Duration) {
    let item = document.createElement('div')
    item.className = 'sheet-week-item'
    item.id = id.toString()
    this.appendItemIndex(item, id)
    this.appendItemContent(item, duration)
    this.appendItemButton(item)
    this.element.sheet.appendChild(item)
  }

  private appendItemIndex(item: HTMLElement, id: number) {
    let _id = document.createElement('div')
    _id.className = 'sheet-week-item-index'
    _id.id = _id.innerText = `${id + 1}:`
    item.appendChild(_id)
  }
  private appendItemContent(item: HTMLElement, duration: Duration) {
    let content = document.createElement('div')
    content.className = 'sheet-week-item-content'

    let begin = this.createItemContentTime(content, duration.begin)
    begin.event.on('change', (e) => {
      let item = HtmlTool.element.findelement(
        e.element,
        'sheet-week-item'
      ) as HTMLElement
      let index = parseInt(item.id)
      this.event.emit('beginchange', { index: index, time: e.time })
    })

    let _ = document.createElement('div')
    _.innerHTML = '-'
    content.appendChild(_)

    let end = this.createItemContentTime(content, duration.end)
    end.event.on('change', (e) => {
      let item = HtmlTool.element.findelement(
        e.element,
        'sheet-week-item'
      ) as HTMLElement
      let index = parseInt(item.id)
      this.event.emit('endchange', { index: index, time: e.time })
    })

    this.element.times.push({
      begin: begin,
      end: end,
    })

    item.appendChild(content)
  }

  private createItemContentTime(content: HTMLElement, time: Date) {
    let div = document.createElement('div')
    let control = new TimeControl(div)
    control.time = time
    content.appendChild(div)
    return control
  }

  private appendItemButton(item: HTMLElement) {
    let btn = document.createElement('div')
    btn.className = 'sheet-week-item-btn'
    let i = document.createElement('i')
    i.className = 'howell-icon-delete2'
    btn.appendChild(i)
    btn.addEventListener('click', (e) => {
      let item = HtmlTool.element.findelement(
        e.target as HTMLElement,
        'sheet-week-item'
      ) as HTMLElement
      this.event.emit('remove', parseInt(item.id))
    })
    item.appendChild(btn)
  }

  clear() {
    this.element.times = []
    let items = document.querySelectorAll('.sheet-week-item')
    items.forEach((item) => {
      this.element.sheet.removeChild(item)
    })
  }

  load(datas: Duration[] = []) {
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i]
      this.append(i, datas[i])
    }
  }
}
