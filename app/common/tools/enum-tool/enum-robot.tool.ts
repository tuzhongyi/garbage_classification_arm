import { MeshNodeType } from '../../../data-core/enums/robot/mesh-node-type.model'
import { RobotState } from '../../../data-core/enums/robot/robot-state.enum'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'

export class EnumRobotTool {
  async MeshNodeType(value?: MeshNodeType): Promise<string> {
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
  async RobotState(value?: RobotState): Promise<string> {
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
}
