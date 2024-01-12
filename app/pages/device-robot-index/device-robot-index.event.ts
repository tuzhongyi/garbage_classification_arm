export interface DeviceRobotIndexEvent {
  info(id: string): void
  config(id: string): void
  play(id: string): void
  log(id: string): void
}
