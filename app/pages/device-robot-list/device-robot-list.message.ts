import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'
import { WindowModel } from '../window/window.model'

export interface DeviceRobotListMessageReceiverEvent {
  details_result(result: ResultArgs): void
  delete_result(result: ResultArgs): void
}
export interface DeviceRobotListMessageSenderEvent {
  info(id: string): void
  calibration(id: string): void
  play(id: string): void
  config(id: string): void
  log(id: string): void
  open(window: WindowModel): void
  delete_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  load(): void
  todelete(): void
}

export class DeviceRobotListMessage
  implements DeviceRobotListMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private client = new EventMessageClient<
    DeviceRobotListMessageSenderEvent,
    DeviceRobotListMessageReceiverEvent
  >(['info', 'calibration', 'play', 'config', 'log', 'open', 'delete_confirm'])
  private reigst() {
    this.client.receiver.on('details_result', (args) => {
      if (args.result) {
        MessageBar.success(args.message ?? '操作成功')
        this.event.emit('load')
      } else {
        MessageBar.error(args.message ?? "'操作失败'")
      }
    })
    this.client.receiver.on('delete_result', (args) => {
      if (args.result) {
        this.event.emit('todelete')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
  }

  info(id: string): void {
    this.client.sender.emit('info', id)
  }
  calibration(id: string): void {
    this.client.sender.emit('calibration', id)
  }
  play(id: string): void {
    this.client.sender.emit('play', id)
  }
  config(id: string): void {
    this.client.sender.emit('config', id)
  }
  log(id: string): void {
    this.client.sender.emit('log', id)
  }
  open(window: WindowModel): void {
    this.client.sender.emit('open', window)
  }
  delete_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('delete_confirm', window)
  }
}
