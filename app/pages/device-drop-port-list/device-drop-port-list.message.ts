import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { WindowModel } from '../window/window.model'

export interface DeviceDropPortListMessageReceiverEvent {}
export interface DeviceDropPortListMessageSenderEvent {
  open(window: WindowModel): void
}
interface MessageEvent {}

export class DeviceDropPortListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {}

  private client = new EventMessageClient<
    DeviceDropPortListMessageSenderEvent,
    DeviceDropPortListMessageReceiverEvent
  >(['open'])

  picture(window: PictureWindowModel) {
    this.client.sender.emit('open', window)
  }
}
