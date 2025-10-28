import { EventEmitter } from '../../../../common/event-emitter'
import { FactoryResetMode } from '../../../../data-core/enums/factory-reset-mode.enum'

interface FactoryEvent {
  reset(mode: FactoryResetMode): void
}

export class SystemMaintainConfigFactoryHtmlController {
  event = new EventEmitter<FactoryEvent>()
  constructor() {
    this.regist()
  }
  private element = {
    basic: document.getElementById(
      'button_reset_factory_basic'
    ) as HTMLButtonElement,
    full: document.getElementById(
      'button_reset_factory_full'
    ) as HTMLButtonElement,
  }
  private regist() {
    this.element.basic.addEventListener('click', () => {
      this.event.emit('reset', FactoryResetMode.Basic)
    })
    this.element.full.addEventListener('click', () => {
      this.event.emit('reset', FactoryResetMode.Full)
    })
  }
}
