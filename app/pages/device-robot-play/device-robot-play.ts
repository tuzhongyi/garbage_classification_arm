import { LocationTool } from '../../common/tools/location.tool'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotBattery } from '../../data-core/models/robot/robot-battery.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'

import { DeviceRobotPlayBusiness } from './business/device-robot-play.business'
import { DeviceRobotPlayHtmlController } from './device-robot-play.html.controller'

export namespace DeviceRobotCalibration {
  class Controller {
    constructor() {
      this.regist()
      this.load()
      this.status()
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
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    async load() {
      this.model = await this.business.load(this.id)

      this.html.load(this.model)

      this.html.trashcans.load(this.model.trashcans)
    }

    status() {
      setTimeout(() => {
        this.business.status(this.id).then((x) => {
          this.html.status.load(x)
        })
      }, 10 * 1000)
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
