import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
import { SystemMaintainConfigBusiness } from './system-maintain-config.business'
import { SystemMaintainConfigHtmlController } from './system-maintain-config.html.controller'
import { SystemMaintainConfigMessage } from './system-maintain-config.message'
import { SystemMaintainConfigWindow } from './system-maintain-config.window'

export namespace SystemMaintainConfig {
  class Controller {
    constructor() {
      this.regist()
    }
    html = new SystemMaintainConfigHtmlController()
    client = new HowellHttpClient.HttpClient()
    service = new ArmSystemRequestService(this.client.http)
    window = new SystemMaintainConfigWindow()
    message = new SystemMaintainConfigMessage()
    business = new SystemMaintainConfigBusiness()

    regist() {
      this.html.event.on('configdownload', () => {
        this.business.download()
      })
      this.html.event.on('reboot', () => {
        this.window.confirm.message = '是否确认重启设备？'
        this.message.reboot_confirm(this.window.confirm)
      })
      this.html.event.on('shutdown', () => {
        this.window.confirm.message = '是否确认关闭设备？'
        this.message.shutdown_confirm(this.window.confirm)
      })
      this.html.event.on('factoryreset', (mode) => {
        this.window.confirm.message = `是否确认${
          mode === FactoryResetMode.Basic ? '简单' : '完整'
        }恢复设备参数？`
        this.window.confirm.args = mode
        this.message.factoryreset_confirm(this.window.confirm)
      })
      this.message.event.on('toreboot', this.reboot.bind(this))
      this.message.event.on('toshutdown', this.shutdown.bind(this))
      this.message.event.on('tofactoryreset', () => {
        this.factoryreset(this.window.confirm.args)
      })
    }

    reboot() {
      this.business
        .reboot()
        .then((x) => {
          if (x) {
            MessageBar.success('重启成功')
          } else {
            MessageBar.error('重启失败')
          }
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    shutdown() {
      this.business
        .shutdown()
        .then((x) => {
          if (x) {
            MessageBar.success('关机成功')
          } else {
            MessageBar.error('关机失败')
          }
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
    factoryreset(mode: FactoryResetMode) {
      this.business.factory
        .reset(mode)
        .then((x) => {
          if (x) {
            MessageBar.success('恢复成功')
          } else {
            MessageBar.error('恢复失败')
          }
        })
        .catch((x) => {
          MessageBar.error('操作失败')
        })
    }
  }

  const controller = new Controller()
}
