import { MessageBar } from '../../common/tools/message-bar/message-bar'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotListBusiness } from './device-robot-list.business'
import { DeviceRobotListHtmlController } from './device-robot-list.html.controller'
import { DeviceRobotListMessage } from './device-robot-list.message'
import { DeviceRobotWindow } from './device-robot-list.model'

export namespace DeviceRobotList {
  export class HtmlController {
    html = new DeviceRobotListHtmlController()
    business = new DeviceRobotListBusiness()
    message = new DeviceRobotListMessage()
    window = new DeviceRobotWindow()

    constructor() {
      this.regist()
      this.load()
    }

    datas: Robot[] = []

    async load() {
      this.datas = await this.business.load()
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('info', (id) => {
        this.message.sender.emit('info', id)
      })
      this.html.event.on('config', (id) => {
        this.message.sender.emit('config', id)
      })
      this.html.event.on('play', (id) => {
        this.message.sender.emit('play', id)
      })
      this.html.event.on('log', (id) => {
        this.message.sender.emit('log', id)
      })
      this.html.event.on('create', (auto) => {
        if (auto) {
          this.message.sender.emit('create', this.window.discover)
        } else {
          this.message.sender.emit('create', this.window.details)
        }
      })
      this.html.event.on('delete', (id) => {
        let data = this.datas.find((data) => data.Id === id)
        if (!data) return
        this.window.confirm.id = id
        this.window.confirm.message = `是否删除机器人 ${
          data.Name ?? data.HostAddress
        }`
        this.message.sender.emit('delete', this.window.confirm)
      })
      this.message.receiver.on('device_robot_list_create_result', (result) => {
        if (result) {
          MessageBar.success('操作成功')
          this.html.clear()
          this.load()
        } else {
          MessageBar.error('操作失败')
        }
      })
      this.message.receiver.on('device_robot_list_delete_result', (result) => {
        if (result && this.window.confirm.id) {
          this.business
            .delete(this.window.confirm.id)
            .then((x) => {
              MessageBar.success('操作成功')
              this.html.clear()
              this.load()
            })
            .catch((e) => {
              MessageBar.error('操作失败')
            })
        }
      })
    }
  }

  const controller = new HtmlController()
}
