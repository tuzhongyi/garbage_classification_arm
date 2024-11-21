import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceCompactorInfoMessageReceiverEvent,
  DeviceCompactorInfoMessageSenderEvent,
} from '../device-compactor-info/device-compactor-info.message'

import {
  DeviceCompactorListMessageReceiverEvent,
  DeviceCompactorListMessageSenderEvent,
} from '../device-compactor-list/device-compactor-list.message'
import {
  DeviceCompactorNetworkMessageReceiverEvent,
  DeviceCompactorNetworkMessageSenderEvent,
} from '../device-compactor-network/device-compactor-network.message'
import {
  DeviceCompactorOperationMessageReceiverEvent,
  DeviceCompactorOperationMessageSenderEvent,
} from '../device-compactor-operation/device-compactor-operation.message'
import {
  DeviceCompactorParamsMessageReceiverEvent,
  DeviceCompactorParamsMessageSenderEvent,
} from '../device-compactor-params/device-compactor-params.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageEvent {
  info(id: string): void
  network(id: string): void
  operation(id: string): void
  params(id: string): void
  log(id: string): void
  config(id: string): void
}

interface MessageReceiverEvent
  extends DeviceCompactorListMessageReceiverEvent,
    DeviceCompactorInfoMessageReceiverEvent,
    DeviceCompactorParamsMessageReceiverEvent,
    DeviceCompactorNetworkMessageReceiverEvent,
    DeviceCompactorOperationMessageReceiverEvent {}
interface MessageSenderEvent
  extends DeviceCompactorListMessageSenderEvent,
    DeviceCompactorInfoMessageSenderEvent,
    DeviceCompactorParamsMessageSenderEvent,
    DeviceCompactorNetworkMessageSenderEvent,
    DeviceCompactorOperationMessageSenderEvent {}

enum MessageCommand {
  details,
  delete,
  save,
  command,
  compression,
}

export class DeviceCompactorIndexMessage implements MessageReceiverEvent {
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

  private command?: MessageCommand

  private regist() {
    this.proxy.event.on('info', (id) => {
      this.event.emit('info', id)
    })
    this.proxy.event.on('params', (id) => {
      this.event.emit('params', id)
    })
    this.proxy.event.on('network', (id) => {
      this.event.emit('network', id)
    })
    this.proxy.event.on('operation', (id) => {
      this.event.emit('operation', id)
    })
    this.proxy.event.on('open', (args) => {
      this.command = MessageCommand.details
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = MessageCommand.delete
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('save_confirm', (args) => {
      this.command = MessageCommand.save
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('command_confirm', (args) => {
      this.command = MessageCommand.command
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('compression_confirm', (args) => {
      this.command = MessageCommand.compression
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.details:
          this.details_result(result)
          break
        case MessageCommand.delete:
          this.delete_result(result)
          break
        case MessageCommand.save:
          this.save_result(result)
          break
        case MessageCommand.command:
          this.command_result(result)
          break
        case MessageCommand.compression:
          this.compression_result(result)
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
  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }

  command_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'command_result',
      value: args,
      index: 0,
    })
  }
  compression_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'compression_result',
      value: args,
      index: 0,
    })
  }
}
