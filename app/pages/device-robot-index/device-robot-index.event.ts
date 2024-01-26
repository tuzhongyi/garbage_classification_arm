export interface DeviceRobotIndexEvent {
  info(id: string): void
  config(id: string): void
  play(id: string): void
  log(id: string): void
  create(args: any): void
  delete(id: string): void
}
export interface DeviceRobotIndexResolveEvent {
  device_robot_list_create_result(result: boolean): void
  device_robot_list_delete_result(result: boolean): void
}
