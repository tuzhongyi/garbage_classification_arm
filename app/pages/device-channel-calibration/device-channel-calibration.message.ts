import { EventEmitter } from '../../common/event-emitter'
import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ResultArgs } from '../main/main.event'
import { ConfirmWindowModel } from '../window-confirm/window-confirm.model'

export interface DeviceChannelCalibrationMessageReceiverEvent {
  save_result(args: ResultArgs): void
}
export interface DeviceChannelCalibrationMessageSenderEvent {
  save_confirm(window: ConfirmWindowModel): void
}
interface MessageEvent {
  save(): void
}

export class DeviceChannelCalibrationMessage
  implements DeviceChannelCalibrationMessageSenderEvent
{
  event: EventEmitter<MessageEvent> = new EventEmitter()
  constructor() {
    this.reigst()
  }

  private window = new DeviceChannelCalibrationWindow()

  private client = new EventMessageClient<
    DeviceChannelCalibrationMessageSenderEvent,
    DeviceChannelCalibrationMessageReceiverEvent
  >(['save_confirm'])
  private reigst() {
    this.client.receiver.on('save_result', (args) => {
      if (args.result) {
        this.event.emit('save')
      }
    })
  }

  save_confirm(): void {
    this.client.sender.emit('save_confirm', this.window.confirm)
  }
}

class DeviceChannelCalibrationWindow {
  confirm = new ConfirmWindow()
}
class ConfirmWindow extends ConfirmWindowModel {
  style = {
    width: '450px',
    height: '200px',
  }
  url: string = '../window-confirm/window-confirm.html'
  message: string = '当前关联的机器人不存在，是否与默认机器人关联？'
  args: any
}
