import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { MainMessageEvent } from '../main/main.event'

export class DeviceChannelIndexMessage {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }
  client = new EventMessageClient(['open'])
  proxy: EventMessageProxy<MainMessageEvent>

  regist() {
    this.proxy.event.on('open', (args) => {
      this.client.event.emit('open', args)
    })
  }
}
