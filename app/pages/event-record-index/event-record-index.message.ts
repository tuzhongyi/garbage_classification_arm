import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import { EventRecordListMessageSenderEvent } from '../event-record-list/event-record-list.message'

interface MessageReceiverEvent {}
interface MessageSenderEvent extends EventRecordListMessageSenderEvent {}

export class EventRecordIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  regist() {
    this.proxy.event.on('open', (args) => {
      this.client.sender.emit('open', args)
    })
    this.client.receiver.on('result', (args) => {
      this.result(args)
    })
  }

  result(args: ResultArgs): void {
    this.proxy.message({
      command: 'result',
      value: args,
      index: 0,
    })
  }
}
