import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { DeviceRobotListEvent } from '../device-robot-list/device-robot-list.event'
import { MainMessageEvent } from '../main/main.event'

export class DeviceRobotIndexMessage extends EventMessageClient<
  MainMessageEvent,
  MainMessageEvent
> {
  constructor(private iframe: HTMLIFrameElement) {
    super(['open', 'confirm'])
  }

  proxy = new EventMessageProxy<DeviceRobotListEvent>(this.iframe)
}
