import { EventEmitter } from '../../common/event-emitter'
import { SystemMaintainConfigConfigHtmlController } from './controller/config/system-maintain-config-config.html.controller'
import { SystemMaintainConfigFactoryHtmlController } from './controller/factory/system-maintain-config-factory.html.controller'
import { SystemMaintainConfigPowerHtmlController } from './controller/power/system-maintain-config-power.html.controller'
import { SystemMaintainConfigUpgradeHtmlController } from './controller/upgrade/system-maintain-config-upgrade.html.controller'
import { SystemMaintainConfigEvent } from './system-maintain-config.event'
import './system-maintain-config.less'

export class SystemMaintainConfigHtmlController {
  event = new EventEmitter<SystemMaintainConfigEvent>()
  constructor() {
    this.regist.load()
  }

  private controller = {
    config: new SystemMaintainConfigConfigHtmlController(),
    factory: new SystemMaintainConfigFactoryHtmlController(),
    power: new SystemMaintainConfigPowerHtmlController(),
    upgrade: new SystemMaintainConfigUpgradeHtmlController(),
  }

  private regist = {
    load: () => {
      this.regist.config()
      this.regist.factory()
      this.regist.power()
      this.regist.upgrade()
    },
    factory: () => {
      this.controller.factory.event.on('reset', (mode) => {
        this.event.emit('factoryreset', mode)
      })
    },
    config: () => {
      this.controller.config.event.on('download', () => {
        this.event.emit('configdownload')
      })
      this.controller.config.event.on('upload', (file) => {
        this.event.emit('configupload', file)
      })
    },
    power: () => {
      this.controller.power.event.on('reboot', () => {
        this.event.emit('reboot')
      })
      this.controller.power.event.on('shutdown', () => {
        this.event.emit('shutdown')
      })
    },
    upgrade: () => {
      this.controller.upgrade.event.on('upload', (file) => {
        this.event.emit('upgradeupload', file)
      })
    },
  }

  set = {
    upgrade: {
      progress: (value: number) => {
        this.controller.upgrade.set.progress(value)
      },
    },
  }
}
