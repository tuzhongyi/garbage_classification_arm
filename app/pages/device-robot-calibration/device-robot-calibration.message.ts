import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface DeviceRobotCalibrationMessageReceiverEvent {
  start_result(result: ResultArgs): void
}
export interface DeviceRobotCalibrationMessageSenderEvent {
  start_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  tostart(): void
}

export class DeviceRobotCalibrationMessage
  implements DeviceRobotCalibrationMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }
  private client = new EventMessageClient<
    DeviceRobotCalibrationMessageSenderEvent,
    DeviceRobotCalibrationMessageReceiverEvent
  >(['start_confirm'])
  private reigst() {
    this.client.receiver.on('start_result', (args) => {
      if (args.result) {
        this.event.emit('tostart')
      } else {
        MessageBar.error(args.message ?? '操作失败')
      }
    })
  }

  start_confirm(window: ConfirmWindowModel): void {
    this.client.sender.emit('start_confirm', window)
  }
}
