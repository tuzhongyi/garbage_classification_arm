import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  AIEventDeploymentMessageReceiverEvent,
  AIEventDeploymentMessageSenderEvent,
} from '../ai-event-deployment/ai-event-deployment.message'
import {
  AIEventRuleMessageReceiverEvent,
  AIEventRuleMessageSenderEvent,
} from '../ai-event-rule/ai-event-rule.message'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageReceiverEvent
  extends AIEventDeploymentMessageReceiverEvent,
    AIEventRuleMessageReceiverEvent {}
interface MessageSenderEvent
  extends AIEventDeploymentMessageSenderEvent,
    AIEventRuleMessageSenderEvent {}

enum MessageCommand {
  normal,
  delete,
  save,
}

export class AIEventIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }
  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: MessageCommand

  regist() {
    this.proxy.event.on('open', (args) => {
      this.command = MessageCommand.normal
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = MessageCommand.delete
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('save_confirm', (args) => {
      this.command = MessageCommand.save
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.normal:
          this.details_result(result)
          break
        case MessageCommand.delete:
          this.delete_result(result)
          break
        case MessageCommand.save:
          this.save_result(result)
          break

        default:
          break
      }
    })
  }

  details_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'details_result',
      value: result,
      index: 0,
    })
  }
  delete_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: result,
      index: 0,
    })
  }

  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }
}
