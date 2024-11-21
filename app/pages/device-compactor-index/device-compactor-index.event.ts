export interface DeviceCompactorIndexEvent {
  info(id: string): void
  network(id: string): void
  operation(id: string): void
  create(args: any): void
  delete(id: string): void
}
export interface DeviceCompactorIndexResolveEvent {
  device_compactor_list_create_result(result: boolean): void
  device_compactor_list_delete_result(result: boolean): void
}
