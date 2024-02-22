import { IParams } from '../../../models/params.interface'

export class GetSupportedModelsParams implements IParams {
  /**	Int32	事件类型	M	*/
  EventType!: number
  /**	Int32	通道ID，从1开始	O	*/
  ChannelId?: number
  /**	String	设备型号，G3，G5，KT2	O	*/
  DeviceModel?: 'G3' | 'G5' | 'KT2'
}
