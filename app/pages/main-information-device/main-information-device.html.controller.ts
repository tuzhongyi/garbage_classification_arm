import { EventEmitter } from '../../common/event-emitter'

import '../window/window.less'
import { MainInformationDeviceEvent } from './main-information-device.event'
import './main-information-device.less'

export class MainInformationDeviceHtmlController {
  constructor() {
    this.regist()
  }

  event: EventEmitter<MainInformationDeviceEvent> = new EventEmitter()

  private element = {
    SerialNumber: document.getElementById('SerialNumber') as HTMLInputElement,
    buttons: {
      ok: document.getElementById('ok') as HTMLButtonElement,
      cancel: document.getElementById('cancel') as HTMLButtonElement,
    },
  }
  private inited = false

  regist() {
    this.element.buttons.ok.addEventListener('click', () => {
      this.event.emit('ok')
    })
    this.element.buttons.cancel.addEventListener('click', () => {
      this.event.emit('cancel')
    })
  }

  load(value: string) {
    this.element.SerialNumber.value = value
  }

  get() {
    return this.element.SerialNumber.value
  }
}
