import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { RobotBatteryState } from '../../../../data-core/enums/robot/robot-battery-state.enum'
import { RobotState } from '../../../../data-core/enums/robot/robot-state.enum'
import { MeshLocation } from '../../../../data-core/models/robot/mesh-location.model'
import { RobotBattery } from '../../../../data-core/models/robot/robot-battery.model'
import { Robot } from '../../../../data-core/models/robot/robot.model'
import { DeviceRobotStatus } from '../../../device-robot/device-robot.model'

export class DeviceRobotPlayHtmlStatusController {
  constructor() {}

  private element = {
    robot: {
      name: document.getElementById('robot_name') as HTMLDivElement,
    },
    battery: {
      level: document.getElementById('battery_level') as HTMLDivElement,
      state: document.getElementById('robot_state') as HTMLDivElement,
    },
    location: document.getElementById('robot_location') as HTMLDivElement,
  }

  load(status: DeviceRobotStatus) {
    status.robot.then((x) => {
      this.loadRobot(x)
    })
    status.battery.then((x) => {
      this.loadBattery(x)
    })

    this.loadLocation(status.location)
  }

  loadRobot(robot: Robot) {
    this.element.robot.name.innerHTML = robot.Name ?? robot.HostAddress
  }
  loadBattery(battery: RobotBattery) {
    this.element.battery.level.innerHTML = `<span class="${this.getClassnameByBatteryLevel(
      battery.Level
    )}">${battery.Level?.toString() ?? '-'}</span>%`
  }
  async loadLocation(location: MeshLocation) {
    this.element.battery.state.innerHTML = ''
    if (location.State && location.State.length > 0) {
      for (let i = 0; i < location.State.length; i++) {
        const state = location.State[i]
        if (i > 0) {
          this.element.battery.state.innerHTML += ', '
        }
        this.element.battery.state.innerHTML += `<span class="${this.getClassnameByRobotState(
          state
        )}">${await EnumTool.robot.RobotState(state)}</span>`
      }
    } else {
      this.element.battery.state.innerHTML = `<span class="normal">${await EnumTool.robot.RobotState(
        RobotState.None
      )}</span>`
    }

    this.element.location.innerHTML = `(${location.Position.X}, ${location.Position.Y})`
  }

  private getClassnameByBatteryLevel(level?: number) {
    if (level == undefined) return ''
    if (level >= 50) {
      return 'normal'
    } else if (level >= 20) {
      return 'warm'
    } else {
      return 'error'
    }
  }
  private getClassnameByBatteryState(state: RobotBatteryState) {
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
  private getClassnameByRobotState(state: RobotState) {
    switch (state) {
      case RobotState.Upgrading:
      case RobotState.LoBAT:
        return 'warm'
      case RobotState.Error:
      case RobotState.Offline:
        return 'error'
      case RobotState.Busy:
      case RobotState.Charging:
      case RobotState.None:
      default:
        return 'normal'
    }
  }
}
