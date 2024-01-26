import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface ArmMainEventArgs {
  logout(): void
}

export interface MainMessageEvent {
  open<T extends WindowModel>(args: T): void
  confirm<T extends ConfirmWindowModel>(args: T): void
  result(result: boolean): void
}

export interface MainWindowMessageEvent {
  open(args: any): void
  close<T = any>(args?: T): void
  result(result: boolean): void
}
