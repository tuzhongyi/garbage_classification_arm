export interface DeviceRobotDetailsEvent {
  ok(): void
  cancel(): void
}
export interface DeviceRobotDetailsMessageEvent {
  close(): void
  result(result: boolean): void
}
