import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotCapability } from '../device-robot/device-robot.capability'
import { DeviceRobotListBusiness } from './device-robot-list.business'
import { DeviceRobotListHtmlController } from './device-robot-list.html.controller'
import { DeviceRobotListMessage } from './device-robot-list.message'
import { DeviceRobotWindow } from './device-robot-list.model'

export namespace DeviceRobotList {
  export class Controller {
    capability = new DeviceRobotCapability()
    private html = new DeviceRobotListHtmlController()
    private business = new DeviceRobotListBusiness()
    private message = new DeviceRobotListMessage()
    private window = new DeviceRobotWindow()

    constructor() {
      this.regist()
      this.load()
    }

    datas: Robot[] = []

    async load() {
      this.datas = (await this.business.load()) ?? []
      this.html.load(this.datas, (id: string) => {
        return this.business.battery(id)
      })
      this.capability.init()
    }

    regist() {
      this.html.event.on('info', (id) => {
        this.message.info(id)
      })
      this.html.event.on('calibration', (id) => {
        this.message.calibration(id)
      })
      this.html.event.on('play', (id) => {
        this.message.play(id)
      })
      this.html.event.on('config', (id) => {
        this.message.config(id)
      })
      this.html.event.on('log', (id) => {
        this.message.log(id)
      })
      this.html.event.on('create', (auto) => {
        if (auto) {
          this.message.open(this.window.discover)
        } else {
          this.message.open(this.window.details)
        }
      })
      this.html.event.on('delete', (id) => {
        let data = this.datas.find((data) => data.Id === id)
        if (!data) return
        this.window.confirm.id = id
        this.window.confirm.message = `是否删除机器人 ${
          data.Name ?? data.HostAddress
        }`
        this.message.delete_confirm(this.window.confirm)
      })
      this.message.event.on('load', () => {
        this.html.clear()
        this.load()
      })
      this.message.event.on('todelete', () => {
        if (this.window.confirm.id) {
          this.todelete(this.window.confirm.id)
        }
      })
    }

    todelete(id: string) {
      this.business
        .delete(id)
        .then((x) => {
          MessageBar.success('操作成功')
          this.html.clear()
          this.load()
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }
  }

  const controller = new Controller()
}
