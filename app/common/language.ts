import { CalibrationAreaType } from '../data-core/enums/calibration_area_type.enum'
import { DeviceProtocolType } from '../data-core/enums/device-protocol-type.enum'
import { EventType } from '../data-core/enums/event-type.enum'
import { LensType } from '../data-core/enums/lens-type.enum'
import { ProcessState } from '../data-core/enums/process-state.enum'
import { ProxyChannelState } from '../data-core/enums/proxy-channel-state.enum'
import { CoverState } from '../data-core/enums/robot/cover-state.enum'
import { MajorType } from '../data-core/enums/robot/major-type.enum'
import { MeshNodeType } from '../data-core/enums/robot/mesh-node-type.model'
import { RobotBatteryState } from '../data-core/enums/robot/robot-battery-state.enum'
import { CanType } from '../data-core/enums/robot/robot-can-type.model'
import { RobotState } from '../data-core/enums/robot/robot-state.enum'

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
  static DeviceProtocolType(value?: DeviceProtocolType) {
    switch (value) {
      case DeviceProtocolType.Howell8000:
        return DeviceProtocolType.Howell8000
      case DeviceProtocolType.Onvif:
        return DeviceProtocolType.Onvif

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
  static RobotState(value?: RobotState) {
    switch (value) {
      case RobotState.None:
        return '正常'
      case RobotState.Busy:
        return '繁忙'
      case RobotState.Charging:
        return '充电'
      case RobotState.LoBAT:
        return '低电量'
      case RobotState.Error:
        return '故障'
      case RobotState.Upgrading:
        return '升级中'
      case RobotState.Offline:
        return '信号丢失'
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
  static ProcessState(state?: ProcessState) {
    switch (state) {
      case ProcessState.R:
        return '运行中'
      case ProcessState.D:
        return '不可中断睡眠'
      case ProcessState.S:
        return '可中断睡眠'
      case ProcessState.T:
        return '已停止'
      case ProcessState.Z:
        return '僵尸'
      default:
        return '未知'
    }
  }
  static LensType(type?: LensType) {
    switch (type) {
      case LensType.M28:
        return '2.8 毫米'
      case LensType.M40:
        return '4.0 毫米'

      default:
        return '未知'
    }
  }

  static MajorType(value?: MajorType) {
    switch (value) {
      case MajorType.Alarm:
        return '报警'
      case MajorType.Operation:
        return '操作'
      case MajorType.Error:
        return '异常'
      case MajorType.Info:
        return '信息'
      default:
        return '未知'
    }
  }

  static Time(time: number = 0, unit: 'second' | 'minute' = 'second') {
    if (unit === 'second') {
      return this.TimeFromSecond(time)
    } else {
      return this.TimeFromMinute(time)
    }
  }

  private static TimeFromSecond(time?: number) {
    if (time === undefined) return undefined
    let day = Math.floor(time / 60 / 60 / 24)
    let _time = time - day * 60 * 60 * 24
    let hour = Math.floor(_time / 60 / 60)
    _time -= hour * 60 * 60
    let minute = Math.floor(_time / 60)
    _time -= minute * 60
    let second = Math.ceil(_time)
    if (time < 60) {
      return second.toString().padStart(2, '0') + '秒'
    }
    if (time < 60 * 60) {
      return (
        minute.toString().padStart(2, '0') +
        '分钟' +
        (second ? second.toString().padStart(2, '0') + '秒' : '')
      )
    }
    if (time < 60 * 60 * 24) {
      return (
        hour.toString().padStart(2, '0') +
        '小时' +
        (minute ? minute.toString().padStart(2, '0') + '分钟' : '') +
        (second ? second.toString().padStart(2, '0') + '秒' : '')
      )
    }
    return (
      day +
      '天' +
      (hour ? hour.toString().padStart(2, '0') + '小时' : '') +
      (minute ? minute.toString().padStart(2, '0') + '分钟' : '') +
      (second ? second.toString().padStart(2, '0') + '秒' : '')
    )
  }

  private static TimeFromMinute(time?: number) {
    if (time === undefined) return undefined
    let day = Math.floor(time / 60 / 24)
    let _time = time - day * 60 * 24
    let hour = Math.floor(_time / 60)
    _time -= hour * 60
    let minute = Math.ceil(_time)
    if (time < 60) {
      return minute + '分钟'
    }
    if (time < 60 * 24) {
      return hour + '小时' + (minute ? minute + '分钟' : '')
    }
    return (
      day + '天' + (hour ? hour + '小时' : '') + (minute ? minute + '分钟' : '')
    )
  }

  static YesOrNo(bool?: boolean) {
    switch (bool) {
      case true:
        return '是'
      case false:
        return '否'
      default:
        return '未知'
    }
  }

  static Uploaded(bool?: boolean) {
    switch (bool) {
      case true:
        return '已上传'
      case false:
        return '未上传'
      default:
        return '未知'
    }
  }

  static OnlineStatus(status?: number) {
    switch (status) {
      case 0:
        return '在线'
      case 1:
        return '离线'

      default:
        return undefined
    }
  }
  static OpenOrClose(status?: number) {
    switch (status) {
      case 0:
        return '关闭'
      case 1:
        return '开启'

      default:
        return undefined
    }
  }
  static NetworkProtocol(value: number) {
    switch (value) {
      case 0:
        return 'TCP'
      case 1:
        return 'UDP'
      default:
        return ''
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
