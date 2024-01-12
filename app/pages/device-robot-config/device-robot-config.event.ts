export interface DeviceRobotConfigEvent {
  start: () => void
  stop: () => void
  top: () => void
  down: () => void
  left(): void
  right(): void
  clear(): void
}

export interface DeviceRobotTableEvent {
  select(id: string): void
}
