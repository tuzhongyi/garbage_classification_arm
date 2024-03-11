import { CalibrationAreaType } from '../../data-core/enums/calibration_area_type.enum'
import { LensType } from '../../data-core/enums/lens-type.enum'

export interface DeviceChannelCalibrationEvent {
  save(): void
  selectRobot(id: string): void
  selectChannel(id: number): void
  selectAreaType(type: CalibrationAreaType): void
  selectLensType(type: LensType): void
}
