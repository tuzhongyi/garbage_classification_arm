import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'

export interface DeviceChannelListTableEvent {
  modify: (id: string) => void
  sort(sort: Sort): void
}
export interface DeviceChannelListEvent {
  create(): void
  delete(ids: string[]): void
  discover(): void
  sync(): void
  search(text: string): void
}
