import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

import {
  DeviceTrashCanParamsMessageReceiverEvent,
  DeviceTrashCanParamsMessageSenderEvent,
} from '../device-trashcan-params/device-trashcan-params.message'

interface MessageReceiverEvent
  extends DeviceTrashCanParamsMessageReceiverEvent {}
interface MessageSenderEvent extends DeviceTrashCanParamsMessageSenderEvent {}

export class AIAnalysisServerIndexMessage implements MessageReceiverEvent {
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
    this.proxy.event.on('confirm', (args) => {
      this.client.sender.emit('confirm', args)
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
