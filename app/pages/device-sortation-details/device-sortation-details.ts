import { Guid } from '../../common/tools/guid/guid'
import { LocationTool } from '../../common/tools/location.tool'
import { SortationDevice } from '../../data-core/models/sortation/sortation-device.model'
import { DeviceSortationDetailsBusiness } from './device-sortation-details.business'
import { DeviceSortationDetailsHtmlController } from './device-sortation-details.html.controller'
import { DeviceSortationDetailsMessage } from './device-sortation-details.message'

export namespace DeviceSortationDetails {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new DeviceSortationDetailsHtmlController()
    private business = new DeviceSortationDetailsBusiness()
    private message = new DeviceSortationDetailsMessage()
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

    onok() {
      let data = new SortationDevice()
      data.Id = Guid.NewGuid().ToString('N')
      data = this.html.get(data)
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

  const controller = new Controller()
}
