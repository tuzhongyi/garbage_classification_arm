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

export class DeviceChannelIndexMessage
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
    this.proxy.event.on('sync_confirm', (args) => {
      this.command = 2
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case 0:
          this.details_result(result)
          break
        case 1:
          this.delete_result(result)
          break
        case 2:
          this.sync_result(result)
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
  sync_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'sync_result',
      value: result,
      index: 0,
    })
  }
}
