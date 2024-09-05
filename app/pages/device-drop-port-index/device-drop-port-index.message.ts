import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  DeviceDropPortListMessageReceiverEvent,
  DeviceDropPortListMessageSenderEvent,
} from '../device-drop-port-list/device-drop-port-list.message'

interface MessageReceiverEvent extends DeviceDropPortListMessageReceiverEvent {}
interface MessageSenderEvent extends DeviceDropPortListMessageSenderEvent {}

enum MessageCommand {
  default,
  confirm,
  result,
}

export class DeviceDropPortIndexMessage implements MessageReceiverEvent {
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
      this.command = MessageCommand.default
      this.client.sender.emit('open', args)
    })
    this.client.receiver.on('result', (args) => {
      this.command = MessageCommand.result
      this.result(args)
    })
  }

  result(args: ResultArgs): void {
    this.proxy.message({
      command: 'result',
      value: args,
      index: 0,
    })
  }
}
