import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface DeviceCompactorOperationMessageReceiverEvent {
  command_result(args: ResultArgs): void
  compression_result(args: ResultArgs): void
}
export interface DeviceCompactorOperationMessageSenderEvent {
  command_confirm(window: ConfirmWindowModel): void
  compression_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  command(): void
  compression(): void
}

export class DeviceCompactorOperationMessage
  implements DeviceCompactorOperationMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    DeviceCompactorOperationMessageSenderEvent,
    DeviceCompactorOperationMessageReceiverEvent
  >(['command_confirm', 'compression_confirm'])
  private reigst() {
    this.client.receiver.on('command_result', (args) => {
      if (args.result) {
        this.event.emit('command')
      }
    })
    this.client.receiver.on('compression_result', (args) => {
      if (args.result) {
        this.event.emit('compression')
      }
    })
  }

  command_confirm(window: ConfirmWindowModel<any>): void {
    this.client.sender.emit('command_confirm', window)
  }
  compression_confirm(window: ConfirmWindowModel<any>): void {
    this.client.sender.emit('compression_confirm', window)
  }
}
