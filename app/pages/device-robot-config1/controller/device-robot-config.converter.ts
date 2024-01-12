import { Position } from '../device-robot-config.model'

export class DeviceRobotConfigConverter {
  static size = {
    width: 0,
    height: 0,
  }
  static position(position: Position) {
    return {
      x: position.x,
      y: this.size.height - position.y,
    }
  }
}
