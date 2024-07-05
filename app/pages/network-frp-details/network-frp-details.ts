import { CheckTool } from '../../common/tools/check-tool/check.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { FrpInfo } from '../../data-core/models/frp-info/frp-info.model'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { NetworkFrpDetailsBusiness } from './network-frp-details.business'
import { NetworkFrpDetailsHtmlController } from './network-frp-details.html.controller'
import { NetworkFrpDetailsMessage } from './network-frp-details.message'

export namespace NetworkFrpDetails {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new NetworkFrpDetailsHtmlController()
    private business = new NetworkFrpDetailsBusiness()
    private message = new NetworkFrpDetailsMessage()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    data?: SortationDevice

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    oncancel() {
      this.message.close()
    }

    check(data: FrpInfo) {
      let result = CheckTool.FrpInfo(data)
      if (!result.result && result.inner) {
        this.message.result(result)
      }
      return result.result
    }

    onok() {
      let data = new FrpInfo()
      data = this.html.get(data)
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
