import { CoverState } from '../../../data-core/enums/robot/cover-state.enum'
import { CanType } from '../../../data-core/enums/robot/robot-can-type.model'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'

export class EnumTrashCanTool {
  async TrashCanRecordType(value?: string, def = ''): Promise<string> {
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
          resolve(value ?? def)
        })
        .catch((x) => {
          resolve(value ?? def)
        })
    })
  }
  async CoverState(value?: CoverState): Promise<string> {
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
  async CanType(value?: CanType, def?: string): Promise<string> {
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
          resolve(Language.CanType(value, def))
        })
        .catch((x) => {
          resolve(Language.CanType(value, def))
        })
    })
  }
}
