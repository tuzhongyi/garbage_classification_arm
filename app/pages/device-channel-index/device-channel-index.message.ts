import { EventMessageClient } from '../../common/event-message/event-message.client'
import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import {
  DeviceChannelCalibrationMessageReceiverEvent,
  DeviceChannelCalibrationMessageSenderEvent,
} from '../device-channel-calibration/device-channel-calibration.message'
import {
  DeviceChannelListMessageReceiverEvent,
  DeviceChannelListMessageSenderEvent,
} from '../device-channel-list/device-channel-list.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'

interface MessageReceiverEvent
  extends DeviceChannelListMessageReceiverEvent,
    DeviceChannelCalibrationMessageReceiverEvent {}

interface MessageSenderEvent
  extends DeviceChannelListMessageSenderEvent,
    DeviceChannelCalibrationMessageSenderEvent {}

enum MessageCommand {
  default,
  delete,
  sync,
  save,
}

export class DeviceChannelIndexMessage implements MessageReceiverEvent {
  constructor(iframe: HTMLIFrameElement) {
    this.proxy = new EventMessageProxy(iframe)
    this.regist()
  }

  client = new EventMessageClient<
    MainMessageRequestEvent,
    MainMessageResponseEvent
  >(['open', 'confirm'])
  proxy: EventMessageProxy<MessageSenderEvent>

  command?: MessageCommand

  regist() {
    this.proxy.event.on('open', (args) => {
      this.command = MessageCommand.default
      this.client.sender.emit('open', args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = MessageCommand.delete
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('sync_confirm', (args) => {
      this.command = MessageCommand.sync
      this.client.sender.emit('confirm', args)
    })
    this.proxy.event.on('save_confirm', (args) => {
      this.command = MessageCommand.save
      this.client.sender.emit('confirm', args)
    })
    this.client.receiver.on('result', (result) => {
      switch (this.command) {
        case MessageCommand.default:
          this.details_result(result)
          break
        case MessageCommand.delete:
          this.delete_result(result)
          break
        case MessageCommand.sync:
          this.sync_result(result)
          break
        case MessageCommand.save:
          this.save_result(result)
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
  sync_result(result: ResultArgs): void {
    this.proxy.message({
      command: 'sync_result',
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
}
