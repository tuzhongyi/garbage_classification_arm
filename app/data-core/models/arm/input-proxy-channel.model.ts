import { Type } from 'class-transformer'
import 'reflect-metadata'
import { ProxyChannelState } from '../../enums/proxy-channel-state.enum'
import { IIdNameModel } from '../model.interface'
import { VideoSourceChannel } from './video-source-channel.model'
/**	InputProxyChannel (代理通道)	*/
export class InputProxyChannel implements IIdNameModel<number> {
  /**	Int32	通道ID，从1开始	M	*/
  Id!: number
  /**	String	通道名称	M	*/
  Name!: string
  /**
   * Int32	机位，从1开始。
   * 1-10舱外
   * 11-20舱内
   * 21-30 红外
   * O
   **/
  PositionNo?: number
  /**	VideoSourceChannel	数据来源	M	*/
  @Type(() => VideoSourceChannel)
  SourceChannel!: VideoSourceChannel
  /**
   * String	通道状态：
   * Online：在线
   * Offline：不在线
   * Locked：用户锁定
   * O
   **/
  ChannelState?: ProxyChannelState
  /**	String	通道GUID	O */
  Guid?: string

  static create() {
    let data = new InputProxyChannel()
    data.Id = 0
    data.SourceChannel = new VideoSourceChannel()
    return data
  }
}
