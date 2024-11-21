import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { Compactor } from '../../data-core/models/compactor/compactor.model'
import { DeviceCompactorDetailsBusiness } from './business/device-compactor-details.business'
import { DeviceCompactorDetailsHtmlController } from './device-compactor-details.html.controller'
import { DeviceCompactorDetailsMessage } from './device-compactor-details.message'

export namespace DeviceCompactorDetails {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new DeviceCompactorDetailsHtmlController()
    private business = new DeviceCompactorDetailsBusiness()
    private message = new DeviceCompactorDetailsMessage()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    load() {
      this.business.robot.node().then((x) => {
        if (x) {
          this.html.load(x)
        }
      })
    }

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    check(data: Compactor) {
      let args = CheckTool.Compactor(data)
      if (args.result) {
        return true
      }
      this.message.result(args)
      return false
    }

    oncancel() {
      this.message.close()
    }

    onok() {
      let data = this.html.get()
      if (this.check(data)) {
        this.business
          .create(data)
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
    }
  }

  const controller = new Controller()
}
