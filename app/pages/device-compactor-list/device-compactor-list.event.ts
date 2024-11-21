export interface DeviceCompactorListEvent {
  info(id: string): void
  params(id: string): void
  network(id: string): void
  operation(id: string): void
  create(auto?: boolean): void
  delete(id: string): void
}
