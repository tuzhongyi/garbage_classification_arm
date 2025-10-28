import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  SystemDeviceDatetimeMessageReceiverEvent,
  SystemDeviceDatetimeMessageSenderEvent,
} from '../system-device-datetime/system-device-datetime.message'
import {
  SystemDeviceInfoMessageReceiverEvent,
  SystemDeviceInfoMessageSenderEvent,
} from '../system-device-info/system-device-info.message'

interface MessageReceiverEvent
  extends SystemDeviceInfoMessageReceiverEvent,
    SystemDeviceDatetimeMessageReceiverEvent {}
interface MessageSenderEvent
  extends SystemDeviceInfoMessageSenderEvent,
    SystemDeviceDatetimeMessageSenderEvent {}

enum WindowIndex {
  confirm,
  info,
}

export class SystemDeviceIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  private index?: WindowIndex

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  regist() {
    this.proxy.event.on('save_confirm', (args) => {
      this.index = WindowIndex.confirm
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('open_info', (args) => {
      this.index = WindowIndex.info
      this.client.sender.emit('open', args)
    })
    this.client.receiver.on('result', (args) => {
      switch (this.index) {
        case WindowIndex.confirm:
          this.save_result(args)
          break
        case WindowIndex.info:
          this.info_result(args)
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

  info_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'info_result',
      value: args,
      index: 0,
    })
  }
}
