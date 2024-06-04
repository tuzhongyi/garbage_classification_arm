import { Rectangle } from '../arm/rectangle.model'
import { IModel } from '../model.interface'

/**	SortationGrid (分拣标定方格信息)	*/
export class SortationGrid implements IModel {
  /**	Int32	第几行，从1开始	M	*/
  Row!: number
  /**	Int32	第几列，从1开始	M	*/
  Column!: number
  /**
   * String
   * 方格名称，A1，B1，H8等
   * A=第一列，A2=第二行，第一列
   * M
   **/
  Name!: string
  /**	Rectangle	方格区域，（归一化坐标）	M	*/
  Area!: Rectangle
}
