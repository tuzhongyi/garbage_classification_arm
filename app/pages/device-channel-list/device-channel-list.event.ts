export interface DeviceChannelListTableEvent {
  modify: (id: string) => void
}
export interface DeviceChannelListEvent {
  create(): void
  delete(ids: string[]): void
  discover(): void
  search(text: string): void
}
