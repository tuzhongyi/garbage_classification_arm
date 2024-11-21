import { Manager } from '../../../data-core/requests/managers/manager'
import { EnumToolHelper } from './enum.tool.helper'

export class EnumCompactorTool {
  CompactorState(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.compactor,
      'CompactorStates',
      value,
      def
    )
  }
  DeviceType(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.compactor,
      'DeviceTypes',
      value,
      def
    )
  }
  ProtocolType(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.compactor,
      'ProtocolTypes',
      value,
      def
    )
  }
  CommandTypes(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.compactor,
      'CommandTypes',
      value,
      def
    )
  }
}
