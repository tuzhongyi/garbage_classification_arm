import { LensType } from '../../data-core/enums/lens-type.enum'

export interface DeviceChannelCalibrationEvent {
  save(): void
  selectRobot(id: string): void
  selectChannel(id: number): void
  selectLensType(type: LensType): void
}
