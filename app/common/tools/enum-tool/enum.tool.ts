import { EventType } from '../../../data-core/enums/event-type.enum'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'
import { EnumCompactorTool } from './enum-compactor.tool'
import { EnumDeviceTool } from './enum-device.tool'
import { EnumInputProxyTool } from './enum-input-proxy.tool'
import { EnumRobotTool } from './enum-robot.tool'
import { EnumServerAnalysisTool } from './enum-server-analysis.tool'
import { EnumTrashCanTool } from './enum-trash-can.tool'

export class EnumTool {
  static compactor = new EnumCompactorTool()
  static trashcan = new EnumTrashCanTool()
  static input = {
    proxy: new EnumInputProxyTool(),
  }
  static device = new EnumDeviceTool()
  static robot = new EnumRobotTool()
  static server = {
    analysis: new EnumServerAnalysisTool(),
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
