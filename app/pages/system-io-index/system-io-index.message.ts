import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  SystemIOInputMessageReceiverEvent,
  SystemIOInputMessageSenderEvent,
} from '../system-io-input/system-io-input.message'
import {
  SystemIOOutputMessageReceiverEvent,
  SystemIOOutputMessageSenderEvent,
} from '../system-io-output/system-io-output.message'

interface MessageReceiverEvent
  extends SystemIOInputMessageReceiverEvent,
    SystemIOOutputMessageReceiverEvent {}
interface MessageSenderEvent
  extends SystemIOInputMessageSenderEvent,
    SystemIOOutputMessageSenderEvent {}

enum MessageCommand {
  save = 1,
  manual = 2,
  copy = 3,
}

export class SystemIOIndexMessage implements MessageReceiverEvent {
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
    this.proxy.event.on('save_confirm', (args) => {
      this.command = MessageCommand.save
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('manual_confirm', (args) => {
      this.command = MessageCommand.manual
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('copy_open', (args) => {
      this.command = MessageCommand.copy
      this.client.sender.emit('open', args)
    })

    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.save:
          this.save_result(result)
          break
        case MessageCommand.manual:
          this.manual_result(result)
          break
        case MessageCommand.copy:
          this.copy_result(result)
          break
        default:
          break
      }
    })
  }

  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }
  manual_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'manual_result',
      value: args,
      index: 0,
    })
  }

  copy_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'copy_result',
      value: args,
      index: 0,
    })
  }
}
