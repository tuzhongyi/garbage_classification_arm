export interface DeviceDropPortDetailsEvent {
  ok(): void
  cancel(): void
}

export interface DeviceDropPortDetailsInfoEvent {
  channel(id: string): void
}
