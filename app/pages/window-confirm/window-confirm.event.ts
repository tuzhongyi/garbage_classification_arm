import { ConfirmWindowModel } from './window-confirm.model'

export interface ConfirmWindowEvent {
  ok(): void
  cancel(): void
}
export interface ConfirmWindowMessageEvent {
  confirm_open(args: ConfirmWindowModel): void
  confirm_close(): void
  confirm_result(result: boolean): void
}
