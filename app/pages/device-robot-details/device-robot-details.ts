import { Guid } from '../../common/tools/guid/guid'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
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
    html = new DeviceRobotDetailsHtmlController()
    business = new DeviceRobotDetailsBusiness()
    message = new DeviceRobotDetailsMessage()
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
      data.CustomizedInfo = HtmlTool.get(this.html.element.CustomizedInfo.value)
      data.DeviceType = this.html.element.DeviceType.value
      data.ProtocolType = this.html.element.ProtocolType.value
      data.HostAddress = this.html.element.HostAddress.value
      data.SerialNumber = this.html.element.SerialNumber.value
      data.PortNo = parseInt(this.html.element.PortNo.value)
      data.Name = HtmlTool.get(this.html.element.Name.value)
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
