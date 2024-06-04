import { Rectangle } from '../../../models/arm/rectangle.model'
import { IParams } from '../../../models/params.interface'

export class GetSortationGridsParams implements IParams {
  /**	Int32	操作台区域分割行数，默认：8，一共8x8=64格	M	*/
  Rows!: number
  /**	Int32	操作台区域分割列数，默认：8，一共8x8=64格	M	*/
  Columns!: number
  /**
   * String
   * 摄像机相对于投口的旋转角度
   * 必须保证操作台正对投口的左上角第一个是A1格子。
   * M
   **/
  Rotation!: string
  /**	Rectangle	分拣操作台区域，（归一化坐标）	M	*/
  ConsoleArea!: Rectangle
}
