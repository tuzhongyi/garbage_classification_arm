import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { WindowModel } from '../window/window.model'

export interface DeviceDropPortListMessageReceiverEvent {
  details_result(window: ResultArgs): void
  delete_result(window: ResultArgs): void
}
export interface DeviceDropPortListMessageSenderEvent {
  picture_open(window: PictureWindowModel): void
  details_open(window: WindowModel): void
  delete_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  load(): void
  delete(): void
}

export class DeviceDropPortListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    DeviceDropPortListMessageSenderEvent,
    DeviceDropPortListMessageReceiverEvent
  >(['picture_open', 'details_open', 'delete_confirm'])

  private reigst() {
    this.client.receiver.on('details_result', (args: ResultArgs) => {
      if (args.result) {
        MessageBar.success(args.message ?? '操作成功')
        this.event.emit('load')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
    this.client.receiver.on('delete_result', (args: ResultArgs) => {
      if (args.result) {
        this.event.emit('delete')
      }
    })
  }

  picture(window: PictureWindowModel) {
    this.client.sender.emit('picture_open', window)
  }
  details(window: WindowModel) {
    this.client.sender.emit('details_open', window)
  }
  delete(window: ConfirmWindowModel) {
    this.client.sender.emit('delete_confirm', window)
  }
}
