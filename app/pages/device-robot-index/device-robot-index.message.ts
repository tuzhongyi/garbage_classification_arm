import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceRobotConfigMessageReceiverEvent,
  DeviceRobotConfigMessageSenderEvent,
} from '../device-robot-config/device-robot-config.message'
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

interface MessageReceiverEvent
  extends DeviceRobotListMessageReceiverEvent,
    DeviceRobotConfigMessageReceiverEvent {}
interface MessageSenderEvent
  extends DeviceRobotListMessageSenderEvent,
    DeviceRobotConfigMessageSenderEvent {}

export class DeviceRobotIndexMessage implements MessageReceiverEvent {
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
      this.command = 0
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('confirm', (args) => {
      this.command = 1
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('start_confirm', (args) => {
      this.command = 2
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
