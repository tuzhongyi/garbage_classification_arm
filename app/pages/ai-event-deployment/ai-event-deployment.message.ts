import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface AIEventDeploymentMessageReceiverEvent {
  result(args: ResultArgs): void
}
export interface AIEventDeploymentMessageSenderEvent {
  confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  save(): void
}

export class AIEventDeploymentMessage
  implements AIEventDeploymentMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    AIEventDeploymentMessageSenderEvent,
    AIEventDeploymentMessageReceiverEvent
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
