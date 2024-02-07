import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface DeviceChannelListMessageReceiverEvent {
  details_result(result: ResultArgs): void
  delete_result(result: ResultArgs): void
}
export interface DeviceChannelListMessageSenderEvent {
  open(window: WindowModel): void
  confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  load(): void
  todelete(): void
}

export class DeviceChannelListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    DeviceChannelListMessageSenderEvent,
    DeviceChannelListMessageReceiverEvent
  >(['open', 'confirm'])

  private reigst() {
    this.client.receiver.on('details_result', (args: ResultArgs) => {
      if (args.result) {
        MessageBar.success(args.message ?? '操作成功')
        this.event.emit('load')
      } else {
        MessageBar.error(args.message ?? '操作失败')
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

  discover(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  create(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  modify(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
  confirm(window: ConfirmWindowModel) {
    this.client.sender.emit('confirm', window)
  }
}
