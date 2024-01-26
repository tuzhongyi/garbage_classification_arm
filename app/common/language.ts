import { ProxyChannelState } from '../data-core/enums/proxy-channel-state.enum'
import { MeshNodeType } from '../data-core/enums/robot/mesh-node-type.model'
import { RobotBatteryState } from '../data-core/enums/robot/robot-battery-state.enum'
import { CanType } from '../data-core/enums/robot/robot-can-type.model'

export class Language {
  static ChannelPositionNo(value?: number) {
    if (value === undefined) return '未知'
    if (1 <= value && value <= 10) {
      return '舱外'
    } else if (11 <= value && value <= 20) {
      return '舱内'
    } else if (21 <= value && value <= 30) {
      return '红外'
    } else {
      return '未知'
    }
  }

  static ProxyChannelState(value?: ProxyChannelState) {
    switch (value) {
      case ProxyChannelState.Locked:
        return '用户锁定'
      case ProxyChannelState.Offline:
        return '离线'
      case ProxyChannelState.Online:
        return '在线'
      default:
        return '未知'
    }
  }
  static MeshNodeType(type?: MeshNodeType) {
    switch (type) {
      case MeshNodeType.ChargingPort:
        return '充电口'
      case MeshNodeType.DropPort:
        return '投放口'
      case MeshNodeType.MagneticPin:
        return '磁钉'
      case MeshNodeType.StorePort:
        return '存放口'
      case MeshNodeType.Other:
        return '其他'
      default:
        return '未知'
    }
  }

  static CanType(type?: CanType) {
    switch (type) {
      case CanType.Dry:
        return '干垃圾'
      case CanType.Wet:
        return '湿垃圾'
      case CanType.Recycle:
        return '可回收垃圾'
      case CanType.Hazard:
        return '有害垃圾'

      default:
        return '未知'
    }
  }
  static RobotBatteryState(value?: RobotBatteryState) {
    switch (value) {
      case RobotBatteryState.Normal:
        return '正常'
      case RobotBatteryState.Charging:
        return '充电中'
      case RobotBatteryState.Unable:
        return '无法充电'
      case RobotBatteryState.UnderVoltage:
        return '欠压、亏电'

      default:
        return '未知'
    }
  }
}

export class Icon {
  static CanType(type?: CanType) {
    switch (type) {
      case CanType.Dry:
        return '&#xf08b;'
      case CanType.Wet:
        return '&#xf08b;'
      case CanType.Recycle:
        return '&#xf08b;'
      case CanType.Hazard:
        return '&#xf08b;'

      default:
        return ''
    }
  }
}
