import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface SystemIOInputMessageReceiverEvent {
  save_result(args: ResultArgs): void
}
export interface SystemIOInputMessageSenderEvent {
  save_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  save(): void
}

export class SystemIOInputMessage implements SystemIOInputMessageSenderEvent {
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    SystemIOInputMessageSenderEvent,
    SystemIOInputMessageReceiverEvent
  >(['save_confirm'])
  private reigst() {
    this.client.receiver.on('save_result', (args) => {
      if (args.result) {
        this.event.emit('save')
      }
    })
  }

  save_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('save_confirm', window)
  }
}
