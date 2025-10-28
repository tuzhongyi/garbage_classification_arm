import * as fs from 'file-saver'
import { EventEmitter } from '../../common/event-emitter'
import { FactoryResetMode } from '../../data-core/enums/factory-reset-mode.enum'
import { DeviceInfo } from '../../data-core/models/arm/device-info.model'
import { UpgradeStatus } from '../../data-core/models/arm/upgrade-status.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'
export class SystemMaintainConfigBusiness {
  private client = new HowellHttpClient.HttpClient()
  private service = new ArmSystemRequestService(this.client.http)

  private data = {
    device: undefined as DeviceInfo | undefined,
  }

  async device() {
    if (!this.data.device) {
      this.data.device = await this.service.device.get()
    }
    return this.data.device
  }

  power = {
    reboot: () => {
      return this.service.reboot()
    },
    shutdown: () => {
      return this.service.shutdown()
    },
  }

  factory = {
    reset: (mode: FactoryResetMode) => {
      return this.service.factory.reset(mode)
    },
  }

  configuration = {
    download: () => {
      this.device().then((device) => {
        this.service.data.configuration.download().then((data) => {
          let suffix = 'zip'
          let filename = `${device.SerialNumber}.${suffix}`
          let blob = new Blob([data], {
            type: 'application/x-zip-compressed',
          })
          fs.saveAs(blob, filename)
        })
      })
    },
    file: undefined as any,
    upload: (file: ArrayBuffer) => {
      return this.service.data.configuration.upload(file)
    },
  }

  upgrade = {
    event: new EventEmitter<UpgradeEvent>(),
    upload: (file: ArrayBuffer) => {
      return this.service.firmware.update(file)
    },
    status: async () => {
      let status = await this.service.status.upgrade()
      if (status.Upgrading) {
        setTimeout(() => {
          this.upgrade.status()
        }, 1000)
      }
      this.upgrade.event.emit('progress', status)
    },
  }
}

interface UpgradeEvent {
  progress(value: UpgradeStatus): void
}
