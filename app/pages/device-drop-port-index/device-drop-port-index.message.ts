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
  details,
  picture,
  delete,
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
    this.proxy.event.on('picture_open', (args) => {
      this.command = MessageCommand.picture
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('details_open', (args) => {
      this.command = MessageCommand.details
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = MessageCommand.delete
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (args) => {
      switch (this.command) {
        case MessageCommand.details:
          this.details_result(args)
          break
        case MessageCommand.delete:
          this.delete_result(args)
          break
        default:
          break
      }
    })
  }

  details_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'details_result',
      value: args,
      index: 0,
    })
  }
  delete_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: args,
      index: 0,
    })
  }
}
