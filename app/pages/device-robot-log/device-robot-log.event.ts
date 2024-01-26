export interface DeviceRobotLogEvent {
  search(): void
  beginchange(time: Date): void
  endchange(time: Date): void
  majorchange(value: string): void
  minorchange(value: string): void
}
export interface DeviceRobotLogHtmlTableEvent {
  page(index: number): void
}
