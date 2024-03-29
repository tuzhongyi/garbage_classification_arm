import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface DeviceTrashCanParamsMessageReceiverEvent {
  result(args: ResultArgs): void
}
export interface DeviceTrashCanParamsMessageSenderEvent {
  confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  save(): void
}

export class DeviceTrashCanParamsMessage
  implements DeviceTrashCanParamsMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    DeviceTrashCanParamsMessageSenderEvent,
    DeviceTrashCanParamsMessageReceiverEvent
  >(['confirm'])
  private reigst() {
    this.client.receiver.on('result', (args) => {
      if (args.result) {
        this.event.emit('save')
      }
    })
  }

  confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('confirm', window)
  }
}
