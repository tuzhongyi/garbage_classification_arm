import { IModel } from '../../model.interface'

/**	Resolution (视频分辨率)	*/
export class Resolution implements IModel {
  /**	Int32	宽，单位：像素	M	*/
  Width!: number
  /**	Int32	高，单位：像素	M	*/
  Height!: number
}
