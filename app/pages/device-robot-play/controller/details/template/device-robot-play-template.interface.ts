import { EventEmitter } from '../../../../../common/event-emitter'

export interface IDeviceRobotPlayHtmlTemplateEventArgs {}

export interface IDeviceRobotPlayHtmlTemplateEvent {
  move(): void
  weigh(): void
  change(): void
  reset(): void
  spray(times: IDeviceRobotPlayHtmlTemplateEventArgs): void
  compaction(args: IDeviceRobotPlayHtmlTemplateEventArgs): void
}
export interface IDeviceRobotPlayHtmlTemplate {
  event: EventEmitter<IDeviceRobotPlayHtmlTemplateEvent>
  load(node: any): Promise<void>
  clear(): void
}
