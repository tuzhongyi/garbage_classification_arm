import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceChannelListMessageReceiverEvent,
  DeviceChannelListMessageSenderEvent,
} from '../device-channel-list/device-channel-list.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

export class AIModelIndexMessage
  implements DeviceChannelListMessageReceiverEvent
{
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }
  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<DeviceChannelListMessageSenderEvent>

  isconfirm = false

  regist() {
    this.proxy.event.on('open', (args) => {
      this.isconfirm = false
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('confirm', (args) => {
      this.isconfirm = true
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      if (this.isconfirm) {
        this.delete_result(result)
      } else {
        this.details_result(result)
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
}
