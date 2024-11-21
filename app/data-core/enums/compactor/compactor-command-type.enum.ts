/**	CompactorCommandType (压缩设备命令类型)	*/
export enum CompactorCommandType {
  /**	停止	*/
  Stop = 'Stop',
  /**	手动上升	*/
  Up = 'Up',
  /**	手动下降	*/
  Down = 'Down',
  /**	压机开始工作	*/
  Start = 'Start',
  /**	手动获取距离	*/
  GetDistance = 'GetDistance',
  /**	手动获取压力值	*/
  GetPressure = 'GetPressure',
  /**	压机工作状态	*/
  GetStatus = 'GetStatus',
  /**	垃圾桶放置状态	*/
  GetTrashCanPlacedStatus = 'GetTrashCanPlacedStatus',
}
