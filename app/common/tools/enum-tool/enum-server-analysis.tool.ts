import { Manager } from '../../../data-core/requests/managers/manager'

export class EnumServerAnalysisTool {
  VideoSourceProtocolType(value?: string, def = ''): Promise<string> {
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
          resolve(value ?? def)
        })
        .catch((x) => {
          resolve(value ?? def)
        })
    })
  }

  VideoSourceMode(value?: string, def = ''): Promise<string> {
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
          resolve(value ?? def)
        })
        .catch((x) => {
          resolve(value ?? def)
        })
    })
  }
}
