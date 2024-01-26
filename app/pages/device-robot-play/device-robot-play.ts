import { LocationTool } from '../../common/tools/location.tool'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotBattery } from '../../data-core/models/robot/robot-battery.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'

import { DeviceRobotPlayBusiness } from './device-robot-play.business'
import { DeviceRobotPlayHtmlController } from './device-robot-play.html.controller'

export namespace DeviceRobotConfig {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    html = new DeviceRobotPlayHtmlController()
    business = new DeviceRobotPlayBusiness()
    model?: DeviceRobotModel

    battery?: RobotBattery
    selected: {
      begin?: MeshNode
      end?: MeshNode
    } = {}
    ischange = false

    get id() {
      let querys = LocationTool.querys(location.search)
      return querys.id
    }

    async load() {
      this.model = await this.business.load(this.id)
      this.html.load(this.model)
    }

    regist() {
      this.html.event.on('moveto', this.onmove.bind(this))
      this.html.event.on('changeto', this.onchange.bind(this))
    }
    onmove(target: MeshNode) {
      this.business.moveto(this.id, target)
    }
    onchange(store: MeshNode, drop: MeshNode) {
      this.business.changeto(this.id, store, drop)
    }
  }

  const controller = new Controller()
}
