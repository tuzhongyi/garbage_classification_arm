import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface SystemIOOutputMessageReceiverEvent {
  save_result(args: ResultArgs): void
  manual_result(args: ResultArgs): void
  copy_result(args: ResultArgs): void
}
export interface SystemIOOutputMessageSenderEvent {
  save_confirm(window: ConfirmWindowModel): void
  manual_confirm(window: ConfirmWindowModel): void
  copy_open(window: WindowModel): void
}
interface MessageEvent {
  save(): void
  manual(): void
  copy(result: boolean): void
}

export class SystemIOOutputMessage implements SystemIOOutputMessageSenderEvent {
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    SystemIOOutputMessageSenderEvent,
    SystemIOOutputMessageReceiverEvent
  >(['save_confirm', 'manual_confirm', 'copy_open'])
  private reigst() {
    this.client.receiver.on('save_result', (args) => {
      if (args.result) {
        this.event.emit('save')
      }
    })
    this.client.receiver.on('manual_result', (args) => {
      if (args.result) {
        this.event.emit('manual')
      }
    })
    this.client.receiver.on('copy_result', (args) => {
      this.event.emit('copy', args.result)
    })
  }

  save_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('save_confirm', window)
  }
  manual_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('manual_confirm', window)
  }
  copy_open(window: WindowModel): void {
    this.client.sender.emit('copy_open', window)
  }
}
