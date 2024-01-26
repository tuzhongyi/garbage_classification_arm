import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { EventMessageData } from '../../common/event-message/event-message.proxy.model'
import { ArmMainConfirm } from './main-windows/main.confirm'
import { ArmMainWindow } from './main-windows/main.window'
import { MainMessageEvent } from './main.event'

export class ArmMainMessage {
  constructor(
    private iframe: HTMLIFrameElement,
    private window: ArmMainWindow,
    private confirm: ArmMainConfirm
  ) {
    this.regist()
  }
  private proxy: EventMessageProxy<MainMessageEvent> = new EventMessageProxy(
    this.iframe
  )

  regist() {
    // 注册子页面触发事件
    this.proxy.event.on('open', (args) => {
      this.window.open(args)
    })
    this.proxy.event.on('confirm', (args) => {
      this.confirm.open(args)
    })
    //注册窗口页面返回结果事件
    this.window.event.on('result', (args) => {
      let data: EventMessageData = {
        command: 'result',
        value: args,
        index: 0,
      }
      this.proxy.message(data)
    })
    this.confirm.event.on('result', (args) => {
      let data: EventMessageData = {
        command: 'result',
        value: args,
        index: 0,
      }
      this.proxy.message(data)
    })
  }
}
