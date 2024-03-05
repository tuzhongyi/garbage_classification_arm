import { EventMessageProxy } from '../../common/event-message/event-message.proxy'
import { EventMessageData } from '../../common/event-message/event-message.proxy.model'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import {
  AIEventDeploymentMessageReceiverEvent,
  AIEventDeploymentMessageSenderEvent,
} from '../ai-event-deployment/ai-event-deployment.message'
import {
  AIEventRuleMessageReceiverEvent,
  AIEventRuleMessageSenderEvent,
} from '../ai-event-rule/ai-event-rule.message'
import {
  DeviceChannelListMessageReceiverEvent,
  DeviceChannelListMessageSenderEvent,
} from '../device-channel-list/device-channel-list.message'
import {
  MainMessageRequestEvent,
  MainMessageResponseEvent,
  ResultArgs,
} from '../main/main.event'
import {
  NetworkConfigTCPIPMessageReceiverEvent,
  NetworkConfigTCPIPMessageSenderEvent,
} from '../network-config-tcp-ip/network-config-tcp-ip.message'
import {
  NetworkServerPlatformMessageReceiverEvent,
  NetworkServerPlatformMessageSenderEvent,
} from '../network-server-platform/network-server-platform.message'
import { ArmGuideConfirm } from './guide-windows/guide.confirm'
import { ArmGuideWindow } from './guide-windows/guide.window'

interface MessageReceiverEvent
  extends NetworkConfigTCPIPMessageReceiverEvent,
    DeviceChannelListMessageReceiverEvent,
    AIEventDeploymentMessageReceiverEvent,
    AIEventRuleMessageReceiverEvent,
    NetworkServerPlatformMessageReceiverEvent,
    MainMessageResponseEvent {}
interface MessageSenderEvent
  extends NetworkConfigTCPIPMessageSenderEvent,
    DeviceChannelListMessageSenderEvent,
    AIEventDeploymentMessageSenderEvent,
    AIEventRuleMessageSenderEvent,
    NetworkServerPlatformMessageSenderEvent,
    MainMessageRequestEvent {}

enum MessageCommand {
  default,
  delete,
  save,
  reboot,
  sync,
}

export class ArmGuideMessage implements MessageReceiverEvent {
  constructor(
    private iframe: HTMLIFrameElement,
    private window: ArmGuideWindow,
    private confirm: ArmGuideConfirm
  ) {
    this.regist()
  }

  private proxy: EventMessageProxy<MessageSenderEvent> = new EventMessageProxy(
    this.iframe
  )

  command?: MessageCommand

  regist() {
    // 注册子页面触发事件
    this.proxy.event.on('open', (args) => {
      this.command = MessageCommand.default
      this.window.open(args)
    })
    this.proxy.event.on('confirm', (args) => {
      this.command = MessageCommand.delete
      this.confirm.open(args)
    })
    this.proxy.event.on('delete_confirm', (args) => {
      this.command = MessageCommand.delete
      this.confirm.open(args)
    })
    this.proxy.event.on('save_confirm', (args) => {
      this.command = MessageCommand.save
      this.confirm.open(args)
    })
    this.proxy.event.on('reboot_confirm', (args) => {
      this.command = MessageCommand.reboot
      this.confirm.open(args)
    })
    this.proxy.event.on('sync_confirm', (args) => {
      this.command = MessageCommand.sync
      this.confirm.open(args)
    })
    //注册窗口页面返回结果事件
    this.window.event.on('result', (args) => {
      if (args.result === false && args.inner) {
        MessageBar.warning(args.message)
        return
      }

      switch (this.command) {
        case MessageCommand.default:
          this.details_result(args)
          break

        default:
          break
      }
    })
    this.confirm.event.on('result', (args) => {
      switch (this.command) {
        case MessageCommand.default:
          this.details_result(args)
          break
        case MessageCommand.delete:
          this.delete_result(args)
          break
        case MessageCommand.reboot:
          this.reboot_result(args)
          break
        case MessageCommand.save:
          this.save_result(args)
          break
        case MessageCommand.sync:
          this.sync_result(args)
          break

        default:
          break
      }
    })
  }

  close(): void {
    this.window.close()
  }

  result(args: ResultArgs): void {
    let data: EventMessageData = {
      command: 'result',
      value: args,
      index: 0,
    }
    this.proxy.message(data)
  }

  save_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'save_result',
      value: args,
      index: 0,
    })
  }
  reboot_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'reboot_result',
      value: args,
      index: 0,
    })
  }
  details_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'details_result',
      value: args,
      index: 0,
    })
  }
  delete_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'delete_result',
      value: args,
      index: 0,
    })
  }
  sync_result(args: ResultArgs): void {
    this.proxy.message({
      command: 'sync_result',
      value: args,
      index: 0,
    })
  }
}
