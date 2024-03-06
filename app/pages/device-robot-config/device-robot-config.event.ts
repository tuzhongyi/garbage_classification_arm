export interface DeviceRobotConfigEvent {
  download(): void
  upload(file: string): void
}
