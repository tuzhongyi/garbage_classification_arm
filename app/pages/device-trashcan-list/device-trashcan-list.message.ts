import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { WindowModel } from '../window/window.model'

export interface DeviceTrashCanListMessageReceiverEvent {}
export interface DeviceTrashCanListMessageSenderEvent {
  open(window: WindowModel): void
}
interface MessageEvent {}

export class DeviceTrashCanListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {}

  private client = new EventMessageClient<
    DeviceTrashCanListMessageSenderEvent,
    DeviceTrashCanListMessageReceiverEvent
  >(['open'])

  picture(window: PictureWindowModel) {
    this.client.sender.emit('open', window)
  }
}
