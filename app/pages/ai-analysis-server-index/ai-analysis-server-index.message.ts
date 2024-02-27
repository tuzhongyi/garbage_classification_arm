import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  AIAnalysisServerSourceMessageReceiverEvent,
  AIAnalysisServerSourceMessageSenderEvent,
} from '../ai-analysis-server-source/ai-analysis-server-source.message'

interface MessageReceiverEvent
  extends AIAnalysisServerSourceMessageReceiverEvent {}
interface MessageSenderEvent extends AIAnalysisServerSourceMessageSenderEvent {}

export class AIAnalysisServerIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: number

  regist() {
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = 1
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case 1:
          this.delete_result(result)
          break
        default:
          break
      }
    })
  }

  delete_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: result,
      index: 0,
    })
  }
}
