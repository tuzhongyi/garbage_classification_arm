import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  AIAnalysisServerInfoMessageReceiverEvent,
  AIAnalysisServerInfoMessageSenderEvent,
} from '../ai-analysis-server-info/ai-analysis-server-info.message'
import {
  AIAnalysisServerSourceMessageReceiverEvent,
  AIAnalysisServerSourceMessageSenderEvent,
} from '../ai-analysis-server-source/ai-analysis-server-source.message'

interface MessageReceiverEvent
  extends AIAnalysisServerInfoMessageReceiverEvent,
    AIAnalysisServerSourceMessageReceiverEvent {}
interface MessageSenderEvent
  extends AIAnalysisServerInfoMessageSenderEvent,
    AIAnalysisServerSourceMessageSenderEvent {}

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
    this.proxy.event.on('open', (args) => {
      this.command = 0
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = 1
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('info_confirm', (args) => {
      this.command = 2
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case 1:
          this.delete_result(result)
          break
        case 2:
          this.info_result(result)
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
  info_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'info_result',
      value: args,
      index: 0,
    })
  }
}
