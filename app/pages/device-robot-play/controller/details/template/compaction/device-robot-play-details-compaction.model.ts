import { IDeviceRobotPlayHtmlTemplateEventArgs } from '../device-robot-play-template.interface'

export interface IDeviceRobotPlayHtmlTemplateCompactionEventArgs
  extends IDeviceRobotPlayHtmlTemplateEventArgs {
  startcan?: boolean
  endcan?: boolean
  covered?: boolean
}
