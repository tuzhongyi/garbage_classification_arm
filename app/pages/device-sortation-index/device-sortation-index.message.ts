import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'

import {
  DeviceSortationListMessageReceiverEvent,
  DeviceSortationListMessageSenderEvent,
} from '../device-sortation-list/device-sortation-list.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageEvent {
  info(id: string): void
  calibration(id: string): void
  play(id: string): void
  log(id: string): void
  config(id: string): void
}

interface MessageReceiverEvent
  extends DeviceSortationListMessageReceiverEvent {}
interface MessageSenderEvent extends DeviceSortationListMessageSenderEvent {}

export class DeviceSortationIndexMessage implements MessageReceiverEvent {
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  private client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  private proxy: EventMessageProxy<MessageSenderEvent>

  private command?: number

  private regist() {
    this.proxy.event.on('info', (id) => {
      this.event.emit('info', id)
    })
    this.proxy.event.on('calibration', (id) => {
      this.event.emit('calibration', id)
    })
    this.proxy.event.on('play', (id) => {
      this.event.emit('play', id)
    })
    this.proxy.event.on('open', (args) => {
      this.command = 0
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = 1
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case 0:
          this.details_result(result)
          break
        case 1:
          this.delete_result(result)
          break
        case 2:
          this.start_result(result)
          break

        default:
          break
      }
    })
  }

  details_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'details_result',
      value: result,
      index: 0,
    })
  }
  delete_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: result,
      index: 0,
    })
  }

  start_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'start_result',
      value: result,
      index: 0,
    })
  }
}
