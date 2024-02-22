import { CalibrationAreaType } from '../data-core/enums/calibration_area_type.enum'
import { EventType } from '../data-core/enums/event-type.enum'
import { ProxyChannelState } from '../data-core/enums/proxy-channel-state.enum'
import { CoverState } from '../data-core/enums/robot/cover-state.enum'
import { MeshNodeType } from '../data-core/enums/robot/mesh-node-type.model'
import { RobotBatteryState } from '../data-core/enums/robot/robot-battery-state.enum'
import { CanType } from '../data-core/enums/robot/robot-can-type.model'
import { Manager } from '../data-core/requests/managers/manager'

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

  static async EventType(value?: EventType) {
    switch (value) {
      case EventType.IllegalDrop:
        return '垃圾落地'
      case EventType.MixedInto:
        return '混合投放'
      case EventType.GarbageVolume:
        return '垃圾容量'
      case EventType.GarbageFull:
        return '垃圾满溢'
      case EventType.GarbageDrop:
        return '小包垃圾滞留'
      case EventType.GarbageDropTimeout:
        return '小包垃圾滞留超时'
      case EventType.GarbageDropHandle:
        return '小包垃圾滞留处置完成'
      case EventType.GarbageDropSuperTimeout:
        return '小包垃圾滞留超时'
      case EventType.DropWarning:
        return '垃圾投放预警'
      case EventType.VehiclePresence:
        return '车辆占道'
      case EventType.PanicButton:
        return '紧急按钮'
      case EventType.Smoke:
        return '火灾检测'
      case EventType.ConstructionData:
        return '大件垃圾数据更新'
      case EventType.DeviceStatus:
        return '垃圾厢房设备状态'
      case EventType.Sewage:
        return '水渍报警'
      default:
        return '未知'
    }
  }

  static async ProxyChannelState(value?: ProxyChannelState) {
    let capability = await Manager.capability.device
    if (capability.ProcessStates) {
      let _enum = capability.ProcessStates.find((x) => x.Value == value)
      if (_enum) {
        return _enum.Name
      }
    }

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

  static CalibrationAreaType(value?: CalibrationAreaType) {
    switch (value) {
      case CalibrationAreaType.Ground:
        return '地面区域'
      case CalibrationAreaType.DropPort:
        return '投放口'
      case CalibrationAreaType.StorePort:
        return '存桶区'
      default:
        return '未知'
    }
  }
  static CameraAIModelDTOModelType(value?: number) {
    switch (value) {
      case 1:
        return '检测数据'
      case 2:
        return '分类数据'
      default:
        return '未知'
    }
  }
  static CoverState(value?: CoverState) {
    switch (value) {
      case CoverState.Opened:
        return '打开'
      case CoverState.Closed:
        return '关闭'
      case CoverState.HalfOpen:
        return '半开'

      default:
        return '未知'
    }
  }

  static StreamType(value?: number) {
    switch (value) {
      case 1:
        return '主码流'
      case 2:
        return '子码流'
      default:
        return '未知'
    }
  }
  static DeviceType(value?: number) {
    switch (value) {
      case 1:
        return '摄像机'
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
