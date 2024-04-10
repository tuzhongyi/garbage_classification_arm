import { DeviceProtocolType } from '../../../data-core/enums/device-protocol-type.enum'
import { EventType } from '../../../data-core/enums/event-type.enum'
import { ProcessState } from '../../../data-core/enums/process-state.enum'
import { ProxyChannelState } from '../../../data-core/enums/proxy-channel-state.enum'
import { CoverState } from '../../../data-core/enums/robot/cover-state.enum'
import { MeshNodeType } from '../../../data-core/enums/robot/mesh-node-type.model'
import { CanType } from '../../../data-core/enums/robot/robot-can-type.model'
import { RobotState } from '../../../data-core/enums/robot/robot-state.enum'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'

export class EnumTool {
  static async ProxyChannelState(value?: ProxyChannelState): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.inputproxy
        .then((capability) => {
          if (capability.ProxyChannelStates) {
            let _enum = capability.ProxyChannelStates.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.ProxyChannelState(value))
        })
        .catch((x) => {
          resolve(Language.ProxyChannelState(value))
        })
    })
  }

  static async DeviceProtocolType(value?: DeviceProtocolType): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.inputproxy
        .then((capability) => {
          if (capability.DeviceProtocolTypes) {
            let _enum = capability.DeviceProtocolTypes.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.DeviceProtocolType(value))
        })
        .catch((x) => {
          resolve(Language.DeviceProtocolType(value))
        })
    })
  }
  static async ProcessState(value?: ProcessState): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.device
        .then((capability) => {
          if (capability.ProcessStates) {
            let _enum = capability.ProcessStates.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.ProcessState(value))
        })
        .catch((x) => {
          resolve(Language.ProcessState(value))
        })
    })
  }

  static async EventType(value?: EventType, record = false): Promise<string> {
    return new Promise<string>((resolve) => {
      let service = record
        ? Manager.capability.event
        : Manager.capability.depolyment
      service
        .then((capability) => {
          if (capability.EventTypes) {
            let _enum = capability.EventTypes.find(
              (x) => x.Value == value?.toString()
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.EventType(value))
        })
        .catch((x) => {
          resolve(Language.EventType(value))
        })
    })
  }

  static async CanType(value?: CanType): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.trashcan
        .then((capability) => {
          if (capability.CanTypes) {
            let _enum = capability.CanTypes.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.CanType(value))
        })
        .catch((x) => {
          resolve(Language.CanType(value))
        })
    })
  }

  static async MeshNodeType(value?: MeshNodeType): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.robot
        .then((capability) => {
          if (capability.MeshNodeTypes) {
            let _enum = capability.MeshNodeTypes.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.MeshNodeType(value))
        })
        .catch((x) => {
          resolve(Language.MeshNodeType(value))
        })
    })
  }

  static async CoverState(value?: CoverState): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.trashcan
        .then((capability) => {
          if (capability.CoverStates) {
            let _enum = capability.CoverStates.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.CoverState(value))
        })
        .catch((x) => {
          resolve(Language.CoverState(value))
        })
    })
  }
  static async RobotState(value?: RobotState): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.robot
        .then((capability) => {
          if (capability.DeviceStates) {
            let _enum = capability.DeviceStates.find((x) => x.Value == value)
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(Language.RobotState(value))
        })
        .catch((x) => {
          resolve(Language.RobotState(value))
        })
    })
  }

  static async VideoSourceProtocolType(value?: string): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.server.analysis
        .then((capability) => {
          if (capability.VideoSourceProtocolTypes) {
            let _enum = capability.VideoSourceProtocolTypes.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value ?? '')
        })
        .catch((x) => {
          resolve(value ?? '')
        })
    })
  }

  static async VideoSourceMode(value?: string): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.server.analysis
        .then((capability) => {
          if (capability.VideoSourceModes) {
            let _enum = capability.VideoSourceModes.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value ?? '')
        })
        .catch((x) => {
          resolve(value ?? '')
        })
    })
  }

  static async TrashCanRecordType(value?: string): Promise<string> {
    return new Promise<string>((resolve) => {
      Manager.capability.trashcan
        .then((capability) => {
          if (capability.TrashCanRecordTypes) {
            let _enum = capability.TrashCanRecordTypes.find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          resolve(value ?? '')
        })
        .catch((x) => {
          resolve(value ?? '')
        })
    })
  }

  // NTPTimeMode
  // AuthTypes
  // PlatformProtocolVersions
  // NetworkInterfaceSpeeds
  // NetworkInterfaceDuplexs
  // AddressingTypes
  // AITaskTypes
  // AITriggerTypes
  // NumberJudgeCondition
  // AssociationJudgeCondition
  // BatteryStates
  // CommandTypes
}
