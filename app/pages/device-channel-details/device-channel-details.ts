import { EventMessageClient } from '../../common/event-message/event-message.client'
import { LocationTool } from '../../common/tools/location.tool'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { DeviceChannelDetailsBusiness } from './device-channel-details.business'
import { DeviceChannelDetailsHtmlController } from './device-channel-details.html.controller'

export namespace DeviceChannelDetails {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    html = new DeviceChannelDetailsHtmlController()
    business = new DeviceChannelDetailsBusiness()
    message = new EventMessageClient(['close'])
    data?: InputProxyChannel
    async init() {
      if (this.id) {
        this.data = await this.business.load(this.id)
        if (this.data) {
          this.html.load(this.data)
        }
      }
    }

    regist() {
      this.html.event.on('ok', () => {
        if (this.id) {
        } else {
          let data = new InputProxyChannel()
          data.Id = 0
          data.Name = this.html.element.Name.value
          data.PositionNo
        }
        this.message.sender.emit('close')
      })
      this.html.event.on('cancel', () => {
        this.message.sender.emit('close')
      })
    }

    get id() {
      console.log(location)
      if (location.search.length === 0) return undefined
      let querys = LocationTool.querys(location.search)
      return querys.id
    }
  }

  const controller = new Controller()
}
