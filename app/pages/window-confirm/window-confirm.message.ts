import { EventMessageClient } from '../../common/event-message/event-message.client'
import { ConfirmWindowMessageEvent } from './window-confirm.event'

export class ConfirmWindowMessage extends EventMessageClient<
  ConfirmWindowMessageEvent,
  ConfirmWindowMessageEvent
> {
  constructor() {
    super(['confirm_close', 'confirm_result'])
  }
}
