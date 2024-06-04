export interface DeviceSortationDetailsEvent {
  ok(): void
  cancel(): void
}
export interface DeviceSortationDetailsMessageEvent {
  close(): void
  result(result: boolean): void
}
