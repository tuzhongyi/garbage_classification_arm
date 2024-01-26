import { LocationTool } from '../../common/tools/location.tool'
import { MeshNodeType } from '../../data-core/enums/robot/mesh-node-type.model'
import { CanType } from '../../data-core/enums/robot/robot-can-type.model'
import { Page } from '../../data-core/models/page-list.model'
import { LogItem } from '../../data-core/models/robot/robot-log-item.model'
import { Manager } from '../../data-core/requests/managers/manager'
import { DeviceRobotLogBusiness } from './device-robot-log.business'
import { DeviceRobotLogHtmlController } from './device-robot-log.html.controller'
import { DeviceRobotLogTableArgs } from './device-robot-log.model'

export namespace DeviceRobotLog {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    html = new DeviceRobotLogHtmlController()
    business = new DeviceRobotLogBusiness()
    args = new DeviceRobotLogTableArgs()
    datas: LogItem[] = []
    page?: Page
    get id() {
      let querys = LocationTool.querys(location.search)
      return querys.id
    }

    async init() {
      let capability = {
        robot: await Manager.capability.robot,
        trashcan: await Manager.capability.trashcan,
      }
      this.html.load(
        capability.robot.MeshNodeTypes ?? [],
        capability.trashcan.CanTypes ?? []
      )
    }

    regist() {
      this.html.event.on('beginchange', (date) => {
        this.args.duration.begin = date
      })
      this.html.event.on('endchange', (date) => {
        this.args.duration.end = date
      })
      this.html.event.on('majorchange', (value) => {
        this.args.nodeType = value as MeshNodeType
      })
      this.html.event.on('minorchange', (value) => {
        this.args.canType = value as CanType
      })
      this.html.event.on('search', () => {
        this.load(1)
      })
      this.html.element.table.event.on('page', (index) => {
        this.load(index)
      })
    }

    async load(index: number, size: number = 12) {
      let paged = await this.business.load(this.id, index, size, this.args)
      this.datas = paged.Data
      this.page = paged.Page
      this.html.element.table.load(this.datas, this.page)
    }
  }

  let controller = new Controller()
}
