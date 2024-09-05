import { DropPortConfig } from '../../data-core/models/arm/io/drop-port-config.model'

export interface DeviceDropPortListTableEvent {
  picture: (data: DropPortConfig) => void
}
