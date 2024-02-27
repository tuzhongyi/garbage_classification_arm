import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface AIAnalysisServerSourceMessageReceiverEvent {
  delete_result(result: ResultArgs): void
}
export interface AIAnalysisServerSourceMessageSenderEvent {
  delete_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  todelete(): void
}

export class AIAnalysisServerSourceMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    AIAnalysisServerSourceMessageSenderEvent,
    AIAnalysisServerSourceMessageReceiverEvent
  >(['delete_confirm'])

  private reigst() {
    this.client.receiver.on('delete_result', (args) => {
      if (args.result) {
        this.event.emit('todelete')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
  }
  delete_confirm(window: ConfirmWindowModel) {
    this.client.sender.emit('delete_confirm', window)
  }
}
