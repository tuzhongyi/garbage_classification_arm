import { DeviceRobotConverter } from './device-robot.converter'
import { Line, Position } from './device-robot.model'

class EqualsTool {
  static position(a: Position, b: Position) {
    return a.x == b.x && a.y == b.y
  }

  static line(a: Line, b: Line) {
    return this.position(a.begin, b.begin) && this.position(a.end, b.end)
  }
}

export class DeviceRobotTool {
  static equals = EqualsTool
  static converter = DeviceRobotConverter
  static copy(position: Position) {
    return {
      x: position.x,
      y: position.y,
    }
  }
}
