import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { LocationTool } from '../../common/tools/location.tool'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotBattery } from '../../data-core/models/robot/robot-battery.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'

import { DeviceRobotPlayBusiness } from './business/device-robot-play.business'
import { DeviceRobotPlayEChartDisplay } from './controller/details/device-robot-play-chart-display.model'
import { DeviceRobotPlayHtmlController } from './device-robot-play.html.controller'

export namespace DeviceRobotCalibration {
  class Controller {
    constructor() {
      this.config = this.init()
      this.regist()
      this.load()
      this.status()
    }
    private html = new DeviceRobotPlayHtmlController()
    private business = new DeviceRobotPlayBusiness()
    model?: DeviceRobotModel
    config: DeviceRobotPlayEChartDisplay

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

    init() {
      let config = LocalStorageService.robot.get()
      if (!config) {
        config = new DeviceRobotPlayEChartDisplay()
        LocalStorageService.robot.save(config)
      }
      this.html.display.load(config)
      return config
    }

    async load() {
      this.model = await this.business.load(this.id)
      this.html.load(this.model, this.config)
      this.html.trashcans.load(this.model.trashcans)
    }

    reload() {
      if (this.model) {
        this.html.load(this.model, this.config)
        this.html.trashcans.load(this.model.trashcans)
      }
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
      this.html.event.on('weigh', this.onweigh.bind(this))
      this.html.display.event.on('robot', (value) => {
        this.config.robot = value
        LocalStorageService.robot.save(this.config)
        this.reload()
      })
      this.html.display.event.on('label', (value) => {
        this.config.label = value
        LocalStorageService.robot.save(this.config)
        this.reload()
      })
    }
    onmove(target: MeshNode) {
      this.business.moveto(this.id, target)
    }
    onweigh(target: MeshNode) {
      this.business.weigh(this.id, target)
    }
    onchange(store: MeshNode, drop: MeshNode) {
      this.business.changeto(this.id, store, drop)
    }
  }

  const controller = new Controller()
}
