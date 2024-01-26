export interface DeviceRobotListEvent {
  info(id: string): void
  config(id: string): void
  play(id: string): void
  log(id: string): void
  create(auto?: boolean): void
  delete(id: string): void
}
export interface DeviceRobotListMessageSenderEvent {
  open(args: any): void
}
export interface DeviceRobotListMessageReceiverEvent {
  device_robot_list_create_result(result: boolean): void
  device_robot_list_delete_result(result: boolean): void
}
