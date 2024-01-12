import { WindowModel } from '../window/window.model'

export interface ArmMainEventArgs {
  logout: () => void
}

export interface MainMessageEvent {
  open: <T extends WindowModel>(args: T) => void
  close: <T = any>(args?: T) => void
}
