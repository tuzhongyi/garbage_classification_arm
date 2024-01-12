export interface DeviceChannelDiscoverEvent {
  refresh(): void
  password(ids: string[]): void
  search(text: string): void
  ok(): void
  cancel(): void
}
