import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { WindowModel } from '../window/window.model'
import { MainMessageEvent } from './main.event'

export class ArmMainWindow {
  constructor() {
    this.regist()
  }

  element = document.querySelector('#window') as HTMLDivElement
  mask = document.querySelector('#window_mask') as HTMLDivElement
  iframe = this.element.querySelector('iframe') as HTMLIFrameElement
  message: EventMessageProxy<MainMessageEvent> = new EventMessageProxy(
    this.iframe
  )
  open(args: WindowModel) {
    this.mask.style.display = args.show ? '' : 'none'

    if (args.id) {
      this.iframe.src = `${args.url}?id=${args.id}`
    } else {
      this.iframe.src = args.url
    }
    if (args.style) {
      if (args.style.width) {
        this.element.style.width = args.style.width
      }
      if (args.style.height) {
        this.element.style.height = args.style.height
      }
    }
  }

  regist() {
    this.message.event.on('close', (args) => {
      this.mask.style.display = 'none'
    })
  }
}
