class DirectionConverter {
  language(value: number) {
    switch (value) {
      case 0:
        return '上'
      case 90:
        return '右'
      case 180:
        return '下'
      case 270:
        return '左'

      default:
        return ''
    }
  }
}

export class DeviceRobotConverter {
  static direction = new DirectionConverter()
}
