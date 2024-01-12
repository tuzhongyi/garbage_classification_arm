import { EventEmitter } from '../event-emitter'
import { EventMessageData } from './event-message.proxy.model'

export class EventMessageClient<T extends Record<string | number, any>> {
  index = 0
  constructor(private keys: string[]) {
    this.init()
  }
  send<T = any>(data: EventMessageData<T>) {
    let message = JSON.stringify(data)
    window.parent.postMessage(message, '*')
  }
  event: EventEmitter<T> = new EventEmitter()

  init() {
    this.keys.forEach((key) => {
      this.event.on(key, ((args: any) => {
        this.send({
          command: key,
          value: args,
          index: this.index,
        })
      }) as any)
    })
  }
}
