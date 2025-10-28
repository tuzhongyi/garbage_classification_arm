import { EventEmitter } from '../../../../common/event-emitter'

interface PowerEvent {
  reboot(): void
  shutdown(): void
}

export class SystemMaintainConfigPowerHtmlController {
  event = new EventEmitter<PowerEvent>()

  constructor() {
    this.regist()
  }

  private element = {
    reboot: document.getElementById('button_reboot') as HTMLButtonElement,
    shutdown: document.getElementById('button_shutdown') as HTMLButtonElement,
  }

  private regist() {
    this.element.reboot.addEventListener('click', () => {
      this.event.emit('reboot')
    })
    this.element.shutdown.addEventListener('click', () => {
      this.event.emit('shutdown')
    })
  }
}
