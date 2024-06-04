import { Rectangle } from '../../../data-core/models/arm/rectangle.model'

export interface DeviceSortationCalibrationEvent {
  save(): void
  onchannel(id: number): void
  draw(data: Rectangle): void
  rotation(value: string): void
}
