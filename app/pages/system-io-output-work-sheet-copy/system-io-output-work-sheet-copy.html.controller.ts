import { EventEmitter } from '../../common/event-emitter'

import '../../../assets/styles/table-sticky.less'
import '../window/window.less'
import { SystemIOOutputWorkSheetCopyEvent } from './system-io-output-work-sheet-copy.event'
import { SystemIOOutputWorkSheetCopyHtmlTable } from './system-io-output-work-sheet-copy.html.table'
import './system-io-output-work-sheet-copy.less'

export class SystemIOOutputWorkSheetCopyHtmlController {
  event: EventEmitter<SystemIOOutputWorkSheetCopyEvent> = new EventEmitter()
  table = new SystemIOOutputWorkSheetCopyHtmlTable()
  constructor() {
    this.regist()
  }

  private element = {
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }
}
