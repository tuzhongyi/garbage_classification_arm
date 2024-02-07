import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceRobotListMessageReceiverEvent,
  DeviceRobotListMessageSenderEvent,
} from '../device-robot-list/device-robot-list.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageEvent {
  info(id: string): void
  config(id: string): void
  play(id: string): void
  log(id: string): void
}

export class DeviceRobotIndexMessage
  implements DeviceRobotListMessageReceiverEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()

  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  private client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  private proxy: EventMessageProxy<DeviceRobotListMessageSenderEvent>

  private isconfirm = false

  private regist() {
    this.proxy.event.on('info', (id) => {
      this.event.emit('info', id)
    })
    this.proxy.event.on('config', (id) => {
      this.event.emit('config', id)
    })
    this.proxy.event.on('play', (id) => {
      this.event.emit('play', id)
    })
    this.proxy.event.on('log', (id) => {
      this.event.emit('log', id)
    })
    this.proxy.event.on('open', (args) => {
      this.isconfirm = false
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('confirm', (args) => {
      this.isconfirm = true
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      if (this.isconfirm) {
        this.delete_result(result)
      } else {
        this.details_result(result)
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
}
