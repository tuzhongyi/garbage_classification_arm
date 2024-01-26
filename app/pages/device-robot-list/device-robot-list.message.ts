import { EventMessageClient } from '../../common/event-message/event-message.client'
import {
  DeviceRobotIndexEvent,
  DeviceRobotIndexResolveEvent,
} from '../device-robot-index/device-robot-index.event'

export class DeviceRobotListMessage extends EventMessageClient<
  DeviceRobotIndexEvent,
  DeviceRobotIndexResolveEvent
> {
  constructor() {
    super(['info', 'config', 'play', 'log', 'create', 'delete'])
  }
}
