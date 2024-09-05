import { EventEmitter } from '../../../../common/event-emitter'

export interface SystemIOOutputSheetCloneEvent {
  copy(weeks: number[]): void
}
export class SystemIOOutputSheetCloneController {
  event = new EventEmitter<SystemIOOutputSheetCloneEvent>()
  constructor() {
    this.regist()
  }

  private element = {
    panel: document.querySelector('.week-panel') as HTMLDivElement,
    weeks: document.getElementsByName('week') as NodeListOf<HTMLInputElement>,
    all: document.getElementById('copyall') as HTMLInputElement,
    button: {
      ok: document.querySelector(
        '.week-panel .week-button-ok'
      ) as HTMLButtonElement,
      cancel: document.querySelector(
        '.week-panel .week-button-cancel'
      ) as HTMLButtonElement,
    },
  }

  private _show: boolean = false
  public get show(): boolean {
    return this._show
  }
  public set show(v: boolean) {
    this._show = v
    this.element.panel.style.display = v ? '' : 'none'
  }

  private regist() {
    this.element.all.addEventListener('change', () => {
      this.element.weeks.forEach((e) => {
        if (!e.disabled) {
          e.checked = this.element.all.checked
        }
      })
    })
    this.element.button.ok.addEventListener('click', () => {
      let weeks: number[] = []
      this.element.weeks.forEach((e) => {
        if (e.checked && !e.disabled) {
          let id = this.getId(e.id)
          weeks.push(id)
        }
      })
      if (weeks.length > 0) {
        this.event.emit('copy', weeks)
      }
      this.show = false
    })
    this.element.button.cancel.addEventListener('click', () => {
      this.show = false
    })
    this.element.panel.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
    })
  }

  private getId(id: string) {
    return parseInt(id.split('_')[1])
  }

  select(week: number) {
    this.element.weeks.forEach((item) => {
      let id = this.getId(item.id)
      item.checked = week == id
      item.disabled = item.checked
    })
  }
}
