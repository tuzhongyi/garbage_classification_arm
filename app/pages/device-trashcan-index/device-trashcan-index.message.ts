import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  DeviceTrashCanListMessageReceiverEvent,
  DeviceTrashCanListMessageSenderEvent,
} from '../device-trashcan-list/device-trashcan-list.message'
import {
  DeviceTrashCanParamsMessageReceiverEvent,
  DeviceTrashCanParamsMessageSenderEvent,
} from '../device-trashcan-params/device-trashcan-params.message'

interface MessageReceiverEvent
  extends DeviceTrashCanParamsMessageReceiverEvent,
    DeviceTrashCanListMessageReceiverEvent {}
interface MessageSenderEvent
  extends DeviceTrashCanParamsMessageSenderEvent,
    DeviceTrashCanListMessageSenderEvent {}

enum MessageCommand {
  default,
  confirm,
  result,
}

export class DeviceTrashCanIndexMessage implements MessageReceiverEvent {
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
    this.proxy.event.on('confirm', (args) => {
      this.command = MessageCommand.confirm
      this.client.sender.emit('confirm', args)
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
