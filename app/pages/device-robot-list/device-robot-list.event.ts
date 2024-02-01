export interface DeviceRobotListEvent {
  info(id: string): void
  config(id: string): void
  play(id: string): void
  log(id: string): void
  create(auto?: boolean): void
  delete(id: string): void
}
