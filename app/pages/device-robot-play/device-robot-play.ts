import { LocalStorageService } from '../../common/local-storage/local-storage.service'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { LocationTool } from '../../common/tools/location.tool'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { MeshNode } from '../../data-core/models/robot/mesh-node.model'
import { RobotBattery } from '../../data-core/models/robot/robot-battery.model'
import { DeviceRobotModel } from '../device-robot/device-robot.model'

import { DeviceRobotPlayBusiness } from './business/device-robot-play.business'
import { DeviceRobotPlayEChartDisplay } from './controller/details/device-robot-play-chart-display.model'
import { IDeviceRobotPlayHtmlTemplateCompactionEventArgs } from './controller/details/template/compaction/device-robot-play-details-compaction.model'
import { IDeviceRobotPlayHtmlTemplateSprayEventArgs } from './controller/details/template/spray/device-robot-play-details-spray.model'
import { DeviceRobotPlayHtmlController } from './device-robot-play.html.controller'
import { DeviceRobotPlayMode } from './device-robot-play.model'

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
      this.html.event.on('spray', this.onspray.bind(this))
      this.html.event.on('compaction', this.oncompaction.bind(this))
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
      this.html.event.on('modechange', (mode) => {
        switch (mode) {
          case DeviceRobotPlayMode.spray:
            if (this.model) {
              let port = this.model.nodes.find(
                (x) => x.NodeType === MeshNodeType.SterilizedPort
              )
              if (port) {
                this.html.template.load(port)
              }
            }
            break
          case DeviceRobotPlayMode.compaction:
            if (this.model) {
              let trashcans = this.model.trashcans.forEach((x) => {
                !!x.NodeId
              })
              this.html.template.load({ trashcans })
            }
            break

          default:
            break
        }
      })
    }
    onmove(target: MeshNode) {
      this.business.moveto(this.id, target).catch((e) => {
        MessageBar.error(e.message)
      })
    }
    onweigh(target: MeshNode) {
      this.business.weigh(this.id, target).catch((e) => {
        MessageBar.error(e.message)
      })
    }
    onchange(store: MeshNode, drop: MeshNode) {
      this.business.changeto(this.id, store, drop).catch((e) => {
        MessageBar.error(e.message)
      })
    }
    onspray(args: IDeviceRobotPlayHtmlTemplateSprayEventArgs) {
      let node = this.model?.nodes.find(
        (x) => x.NodeType === MeshNodeType.SterilizedPort
      )
      if (node) {
        this.business.spray(this.id, node, args).catch((e) => {
          MessageBar.error(e.message)
        })
      }
    }
    oncompaction(args: {
      start: MeshNode
      end: MeshNode
      args: IDeviceRobotPlayHtmlTemplateCompactionEventArgs
    }) {
      this.business
        .transportto(this.id, args.start, args.end, args.args)
        .catch((e) => {
          MessageBar.error(e.message)
        })
    }
  }

  const controller = new Controller()
}
