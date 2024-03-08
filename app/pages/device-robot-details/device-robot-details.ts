import { Guid } from '../../common/tools/guid/guid'
import { LocationTool } from '../../common/tools/location.tool'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotDetailsBusiness } from './device-robot-details.business'
import { DeviceRobotDetailsHtmlController } from './device-robot-details.html.controller'
import { DeviceRobotDetailsMessage } from './device-robot-details.message'

export namespace DeviceRobotDetails {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new DeviceRobotDetailsHtmlController()
    private business = new DeviceRobotDetailsBusiness()
    private message = new DeviceRobotDetailsMessage()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    data?: Robot

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    oncancel() {
      this.message.close()
    }

    onok() {
      let data = new Robot()
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
