import {
  Transform,
  TransformationType,
  TransformFnParams,
} from 'class-transformer'
import { RobotState } from '../../enums/robot/robot-state.enum'
import { IModel } from '../model.interface'
import { MeshNodePosition } from './mesh-node-position.model'

/**	MeshLocation (设备当前坐标位置和方向)	*/
export class MeshLocation implements IModel {
  /**	Int32	面向方向:0-360度，0=上，90=右，180=下，270=左。	M	*/
  Direction!: number
  /**	MeshNodePosition	坐标	M	*/
  Position!: MeshNodePosition
  /**	Boolean	是否处于磁轨上，true：在磁轨上，false，不在。	O	*/
  OnTrack?: boolean
  /**
   * String	设备状态，
   * None：无
   * Busy：繁忙状态
   * Charging：充电状态
   * LoBAT：低电量
   * Error：故障
   * 如果多个状态同时存在，则使用逗号+半角空格分割
   * O
   **/
  @Transform(transformState)
  State?: RobotState[]
  /**	String	网状节点ID，如果正好在节点，否则为null。	O	*/
  NodeId?: string
  /**	String	最后一次经过的节点ID	O	*/
  LastNodeId?: string
}

export function transformState(params: TransformFnParams) {
  if (params.value == undefined || params.value == null) {
    return params.value
  }
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    let values = (params.value as string).split(',')
    return values.map((x) => x.trim())
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    return params.value.join(', ')
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return params.value
  }
}
