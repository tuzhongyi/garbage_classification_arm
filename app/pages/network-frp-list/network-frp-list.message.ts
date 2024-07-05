import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface NetworkFrpListMessageReceiverEvent {
  details_result(result: ResultArgs): void
  delete_result(result: ResultArgs): void
}
export interface NetworkFrpListMessageSenderEvent {
  open(window: WindowModel): void
  delete_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  load(): void
  todelete(): void
}

export class NetworkFrpListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {
    this.regist()
  }

  private client = new EventMessageClient<
    NetworkFrpListMessageSenderEvent,
    NetworkFrpListMessageReceiverEvent
  >(['open', 'delete_confirm'])

  private regist() {
    this.client.receiver.on('details_result', (args) => {
      if (args.result) {
        MessageBar.success(args.message ?? '操作成功')
        this.event.emit('load')
      } else {
        MessageBar.error(args.message ?? "'操作失败'")
      }
    })
    this.client.receiver.on('delete_result', (args) => {
      if (args.result) {
        this.event.emit('todelete')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
  }
  open(window: WindowModel): void {
    this.client.sender.emit('open', window)
  }
  delete_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('delete_confirm', window)
  }
}
