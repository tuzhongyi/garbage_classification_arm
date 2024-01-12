import { RobotBatteryState } from '../../enums/robot/robot-battery-state.enum'
import { IModel } from '../model.interface'

/**	RobotBattery (电池状态)	*/
export class RobotBattery implements IModel {
  /**	Double	剩余百分比[0-100]	O	*/
  Level?: number
  /**
   * String	电池状态：
   * Normal：正常
   * Charging：充电中
   * Unable：无法充电
   * UnderVoltage：欠压、亏电
   * M
   **/
  State!: RobotBatteryState
}
