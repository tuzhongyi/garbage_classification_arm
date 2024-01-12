import { MessageBar } from '../../common/tools/message-bar/message-bar'
import { NTPTimeMode } from '../../data-core/enums/ntp-time-mode.enum'
import { NTPServer } from '../../data-core/models/arm/ntp-server.model'
import { SystemTime } from '../../data-core/models/arm/system-time.model'
import { SystemDeviceInfoBusiness } from './system-device-datetime.business'
import { SystemDeviceInfoHtmlController } from './system-device-datetime.html.controller'

export namespace SystemDeviceInfo {
  class Controller {
    html = new SystemDeviceInfoHtmlController()
    business = new SystemDeviceInfoBusiness()
    constructor() {
      this.regist()
      this.load()
    }

    regist() {
      this.html.event.on('save', () => {
        this.onsave()
      })
    }

    data?: SystemTime
    local_handle?: NodeJS.Timer
    system_handle?: NodeJS.Timer

    async load() {
      this.data = await this.business.load()
      this.html.load(this.data)
    }

    onsave() {
      if (this.data) {
        this.data.TimeMode = this.html.element.NTPTimeMode.value as NTPTimeMode
        switch (this.data.TimeMode) {
          case NTPTimeMode.NTP:
            this.data.NTPServer = new NTPServer()
            this.data.NTPServer.HostAddress =
              this.html.element.NTPServer.HostAddress.value
            this.data.NTPServer.PortNo = parseInt(
              this.html.element.NTPServer.PortNo.value
            )
            this.data.NTPServer.SynchronizeInterval = parseInt(
              this.html.element.NTPServer.SynchronizeInterval.value
            )
            break
          case NTPTimeMode.Manual:
            this.data.LocalTime = new Date(
              `${this.html.element.LocalDate.value} ${this.html.element.LocalTime.value}`
            )

            break

          default:
            break
        }
        this.business
          .update(this.data)
          .then((x) => {
            MessageBar.success('操作成功')
            this.load()
          })
          .catch((e) => {
            console.error(e)
            MessageBar.error('操作失败')
          })
      }
    }
  }

  let controller = new Controller()
}
