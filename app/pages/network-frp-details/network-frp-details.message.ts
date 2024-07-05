import { EventMessageClient } from '../../common/event-message/event-message.client'
import { MainWindowMessageResponseEvent, ResultArgs } from '../main/main.event'

export interface NetworkFrpDetailsMessageEvent {
  close(): void
  result(result: boolean): void
}

export class NetworkFrpDetailsMessage
  implements MainWindowMessageResponseEvent
{
  private client = new EventMessageClient<MainWindowMessageResponseEvent>([
    'close',
    'result',
  ])

  close(): void {
    this.client.sender.emit('close')
  }
  result(args: ResultArgs): void {
    this.client.sender.emit('result', args)
  }
}
