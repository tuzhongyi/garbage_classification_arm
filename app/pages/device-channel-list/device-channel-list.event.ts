export interface DeviceChannelListTableEvent {
  modify: (id: string) => void
  picture: (id: string) => void
}
export interface DeviceChannelListEvent {
  create(): void
  delete(ids: string[]): void
  discover(): void
  sync(): void
  search(text: string): void
}
