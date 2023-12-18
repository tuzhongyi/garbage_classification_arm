import { IModel } from '../model.interface'

/**	EventTrigger (事件联动内容)	*/
export class EventTrigger implements IModel {
  /**	Boolean	上传到中心服务器，true：上传，false：不上传	M	*/
  UploadCenter!: boolean
  /**	Boolean	联动抓图，true：抓图，false：不抓图	M	*/
  Picture!: boolean
  /**	Boolean	联动声音，true：联动声音false：不联动声音	M	*/
  Audio!: boolean
  /**	Int32	联动声音ID，13开始是自定义音频	O	*/
  AudioId?: number
  /**	Int32[]	联动继电器输出编号	O	*/
  AlarmOutIds?: number[]
}
