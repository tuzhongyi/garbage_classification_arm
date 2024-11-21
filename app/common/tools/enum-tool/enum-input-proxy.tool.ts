import { DeviceProtocolType } from '../../../data-core/enums/device-protocol-type.enum'
import { ProxyChannelState } from '../../../data-core/enums/proxy-channel-state.enum'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'

export class EnumInputProxyTool {
  async ProxyChannelState(value?: ProxyChannelState): Promise<string> {
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

  async DeviceProtocolType(value?: DeviceProtocolType): Promise<string> {
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
}
