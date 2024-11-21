import { IOState } from '../../../data-core/enums/io/io-state.enum'
import { ProcessState } from '../../../data-core/enums/process-state.enum'
import { Manager } from '../../../data-core/requests/managers/manager'
import { Language } from '../../language'
import { EnumToolHelper } from './enum.tool.helper'

export class EnumDeviceTool {
  ProcessState(value?: ProcessState, def?: string): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.device,
      'ProcessStates',
      value,
      def,
      Language.ProcessState(value, def)
    )
  }
  IOState(value?: IOState, def?: string): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.device,
      'IOStates',
      value,
      def,
      Language.IOState(value, def)
    )
  }
  DropPortState(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.device,
      'DropPortStates',
      value,
      def
    )
  }
  TrashCanPortState(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.device,
      'TrashCanPortStates',
      value,
      def
    )
  }
  DropPortType(value?: string, def = ''): Promise<string> {
    return EnumToolHelper.get(
      Manager.capability.device,
      'DropPortTypes',
      value,
      def
    )
  }
}
