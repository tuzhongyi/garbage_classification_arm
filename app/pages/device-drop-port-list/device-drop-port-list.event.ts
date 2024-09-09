import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'

export interface DeviceDropPortListTableEvent {
  delete(data: DropPortConfig): void
  modify: (data: DropPortConfig) => void
}
