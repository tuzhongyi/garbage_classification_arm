import { EventMessageClient } from '../../common/event-message/event-message.client'
import { Robot } from '../../data-core/models/robot/robot.model'
import { DeviceRobotIndexEvent } from '../device-robot-index/device-robot-index.event'
import { DeviceRobotListBusiness } from './device-robot-list.business'
import { DeviceRobotListHtmlController } from './device-robot-list.html.controller'

export namespace DeviceRobotList {
  export class HtmlController {
    html = new DeviceRobotListHtmlController()
    business = new DeviceRobotListBusiness()
    message: EventMessageClient<DeviceRobotIndexEvent>

    constructor() {
      this.regist()
      this.message = this.initMessage()

      this.load()
    }

    datas: Robot[] = []

    initMessage() {
      return new EventMessageClient<DeviceRobotIndexEvent>(this.html.event.keys)
    }

    async load() {
      this.datas = await this.business.load()
      this.html.load(this.datas)
    }

    regist() {
      this.html.event.on('info', (id) => {
        this.message.event.emit('info', id)
      })
      this.html.event.on('config', (id) => {
        this.message.event.emit('config', id)
      })
      this.html.event.on('play', (id) => {
        this.message.event.emit('play', id)
      })
      this.html.event.on('log', (id) => {
        this.message.event.emit('log', id)
      })
    }
  }

  const controller = new HtmlController()
}
