export interface DeviceTrashCanLogEvent {
  search(): void
  datechange(time: Date): void
}
export interface DeviceTrashCanLogHtmlTableEvent {
  page(index: number): void
}
