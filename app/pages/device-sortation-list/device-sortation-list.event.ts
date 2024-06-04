export interface DeviceSortationListEvent {
  info(id: string): void
  calibration(id: string): void
  play(id: string): void
  create(auto?: boolean): void
  delete(id: string): void
}
