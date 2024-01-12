import { ProxyChannelState } from '../data-core/enums/proxy-channel-state.enum'
import { MeshNodeType } from '../data-core/enums/robot/mesh-node-type.model'

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
}
