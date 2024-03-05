export interface DeviceRobotConfigEvent {
  download(): void
  upload(file: ArrayBuffer): void
}
