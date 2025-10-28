import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { MainInformationDeviceBusiness } from './main-information-device.business'
import { MainInformationDeviceHtmlController } from './main-information-device.html.controller'
import { MainInformationDeviceMessage } from './main-information-device.message'

export namespace MainInformationDevice {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new MainInformationDeviceHtmlController()
    private business = new MainInformationDeviceBusiness()
    private message = new MainInformationDeviceMessage()

    async init() {
      this.business.load().then((x) => {
        this.html.load(x)
      })
    }

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    check(data: string) {
      if (!data) {
        MessageBar.warning('请输入设备序列号')
        return false
      }
      return true
    }

    oncancel() {
      this.message.close()
    }
    onok() {
      let value = this.html.get()
      if (!this.check(value)) return

      this.business
        .update(value)
        .then((x) => {
          this.message.result({
            result: true,
          })
          this.message.close()
        })
        .catch((e) => {
          this.message.result({
            result: false,
          })
        })
    }

    toupdate(data: string) {
      return this.business.update(data)
    }
  }

  const controller = new Controller()
}
