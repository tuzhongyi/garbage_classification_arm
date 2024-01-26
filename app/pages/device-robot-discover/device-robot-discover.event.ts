export interface DeviceRobotDiscoverEvent {
  refresh(): void
  search(text: string): void
  ok(): void
  cancel(): void
}
