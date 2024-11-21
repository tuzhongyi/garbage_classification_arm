export interface DeviceCompactorDetailsEvent {
  ok(): void
  cancel(): void
}
export interface DeviceCompactorDetailsMessageEvent {
  close(): void
  result(result: boolean): void
}
