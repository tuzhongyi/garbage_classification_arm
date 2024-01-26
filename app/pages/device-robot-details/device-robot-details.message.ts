import { EventMessageClient } from '../../common/event-message/event-message.client'
import { DeviceRobotDetailsMessageEvent } from './device-robot-details.event'

export class DeviceRobotDetailsMessage extends EventMessageClient<DeviceRobotDetailsMessageEvent> {
  constructor() {
    super(['close', 'result'])
  }
}
