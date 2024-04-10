import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { PictureWindowModel } from '../window-picture/window-picture.model'
import { WindowModel } from '../window/window.model'

export interface EventRecordListMessageSenderEvent {
  open(window: WindowModel): void
}

export class EventRecordListMessage {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<EventRecordListMessageSenderEvent>([
    'open',
  ])

  private reigst() {}

  picture(window: PictureWindowModel) {
    this.client.sender.emit('open', window)
  }
  resources(window: WindowModel) {
    this.client.sender.emit('open', window)
  }
}
