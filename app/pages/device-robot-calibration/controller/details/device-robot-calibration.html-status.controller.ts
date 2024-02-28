import { Language } from '../../../../common/language'
import { RobotBatteryState } from '../../../../data-core/enums/robot/robot-battery-state.enum'
import { RobotBattery } from '../../../../data-core/models/robot/robot-battery.model'
import { Robot } from '../../../../data-core/models/robot/robot.model'

export class DeviceRobotCalibrationHtmlStatusController {
  constructor() {}

  element = {
    robot: {
      name: document.getElementById('robot_name') as HTMLDivElement,
    },
    battery: {
      level: document.getElementById('battery_level') as HTMLDivElement,
      state: document.getElementById('battery_state') as HTMLDivElement,
    },
  }

  load(robot: Robot, batter: RobotBattery) {
    this.element.robot.name.innerHTML = robot.Name ?? robot.HostAddress

    this.element.battery.level.innerHTML = `<span class="${this.getClassnameByBatteryLevel(
      batter.Level
    )}">${batter.Level?.toString() ?? '-'}</span>%`
    this.element.battery.state.innerHTML = `<span class="${this.getClassnameByBatteryState(
      batter.State
    )}">${Language.RobotBatteryState(batter.State)}</span>`
  }

  getClassnameByBatteryLevel(level?: number) {
    if (level == undefined) return ''
    if (level >= 50) {
      return 'normal'
    } else if (level >= 20) {
      return 'warm'
    } else {
      return 'error'
    }
  }
  getClassnameByBatteryState(state: RobotBatteryState) {
    switch (state) {
      case RobotBatteryState.Normal:
      case RobotBatteryState.Charging:
        return 'normal'
      case RobotBatteryState.Unable:
        return 'error'
      case RobotBatteryState.UnderVoltage:
        return 'warm'

      default:
        return ''
    }
  }
}
