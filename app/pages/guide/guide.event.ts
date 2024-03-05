import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface ArmGuideEvent {
  back(): void
  select(index: number): void
}

export interface GuideWindowMessageEvent {
  result(result: ResultArgs): void
}

export interface GuideMessageResponseEvent {
  result(result: ResultArgs): void
}
export interface GuideMessageRequestEvent {
  open<T extends WindowModel>(args: T): void
  confirm<T extends ConfirmWindowModel>(args: T): void
}
export interface GuideWindowMessageResponseEvent {
  close(): void
  result(args: ResultArgs): void
}

export interface ResultArgs {
  result: boolean
  message?: string
  inner?: boolean
}
