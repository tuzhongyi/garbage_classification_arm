import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { Guid } from '../../common/tools/guid/guid'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotInfoBusiness } from './device-robot-info.business'
import { DeviceRobotInfoHtmlController } from './device-robot-info.html.controller'

export namespace DeviceRobotInfo {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new DeviceRobotInfoHtmlController()
    business = new DeviceRobotInfoBusiness()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    data?: Robot

    async load() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        this.html.load(this.data)
      }
    }

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
    }

    onsave() {
      if (this.data) {
        this.onupdate(this.data)
      } else {
        this.oncreate()
      }
    }

    onupdate(data: Robot) {
      data.CustomizedInfo = HtmlTool.get(this.html.element.CustomizedInfo.value)
      data.DeviceType = this.html.element.DeviceType.value
      data.ProtocolType = this.html.element.ProtocolType.value
      data.HostAddress = this.html.element.HostAddress.value
      data.PortNo = parseInt(this.html.element.PortNo.value)
      data.Name = HtmlTool.get(this.html.element.Name.value)
      this.business
        .update(data)
        .then((x) => {
          MessageBar.success('保存成功')
        })
        .catch((e) => {
          MessageBar.error('保存失败')
        })
    }
    oncreate() {
      let data = new Robot()
      data.Id = Guid.NewGuid().ToString('N')
      data.CustomizedInfo = HtmlTool.get(this.html.element.CustomizedInfo.value)
      data.DeviceType = this.html.element.DeviceType.value
      data.ProtocolType = this.html.element.ProtocolType.value
      data.HostAddress = this.html.element.HostAddress.value
      data.PortNo = parseInt(this.html.element.PortNo.value)
      data.Name = HtmlTool.get(this.html.element.Name.value)
      this.business
        .create(data)
        .then((x) => {
          MessageBar.success('保存成功')
        })
        .catch((e) => {
          MessageBar.error('保存失败')
        })
    }
  }

  const controller = new Controller()
}
