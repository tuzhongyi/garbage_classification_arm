import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { DeviceProtocolType } from '../../data-core/enums/device-protocol-type.enum'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { VideoSourceChannel } from '../../data-core/models/arm/video-source-channel.model'
import { DeviceChannelDetailsBusiness } from './device-channel-details.business'
import { DeviceChannelDetailsHtmlController } from './device-channel-details.html.controller'
import { DeviceChannelDetailsMessage } from './device-channel-details.message'

export namespace DeviceChannelDetails {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    html = new DeviceChannelDetailsHtmlController()
    business = new DeviceChannelDetailsBusiness()
    message = new DeviceChannelDetailsMessage()
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
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    get check() {
      if (!this.html.element.Name.value) {
        this.message.result({
          result: false,
          message: '请输入通道名称',
          inner: true,
        })
        return false
      }
      if (!this.html.element.HostAddress.value) {
        this.message.result({
          result: false,
          message: '请输入设备IP地址',
          inner: true,
        })
        return false
      }
      if (!this.html.element.PortNo.value) {
        this.message.result({
          result: false,
          message: '请输入设备端口号',
          inner: true,
        })
        return false
      }
      if (!this.html.element.ProtocolType.value) {
        this.message.result({
          result: false,
          message: '请选择协议类型',
          inner: true,
        })
        return false
      }
      if (!this.html.element.ChannelNo.value) {
        this.message.result({
          result: false,
          message: '请输入设备视频通道编号',
          inner: true,
        })
        return false
      }

      return true
    }

    oncancel() {
      this.message.close()
    }
    onok() {
      if (!this.check) return
      let promise: Promise<InputProxyChannel>

      if (this.data) {
        promise = this.toupdate(this.data)
      } else {
        promise = this.tocreate()
      }
      promise
        .then((x) => {
          this.message.result({
            result: true,
          })
          this.message.close()
        })
        .catch((e) => {
          this.message.result({
            result: false,
          })
        })
    }

    toupdate(data: InputProxyChannel) {
      data.Name = this.html.element.Name.value
      data.PositionNo = HtmlTool.get(this.html.element.PositionNo.value, true)
      data.SourceChannel = new VideoSourceChannel()
      data.SourceChannel.HostAddress = this.html.element.HostAddress.value
      data.SourceChannel.PortNo =
        HtmlTool.get(this.html.element.PortNo.value, true) ?? 0
      data.SourceChannel.ProtocolType = this.html.element.ProtocolType
        .value as DeviceProtocolType
      data.SourceChannel.ChannelNo =
        HtmlTool.get(this.html.element.ChannelNo.value, true) ?? 0
      data.SourceChannel.UserName = HtmlTool.get(
        this.html.element.UserName.value
      )
      data.SourceChannel.Password = HtmlTool.get(
        this.html.element.Password.value
      )
      data.SourceChannel.DeviceId = HtmlTool.get(
        this.html.element.DeviceId.value
      )
      data.SourceChannel.SerialNumber = HtmlTool.get(
        this.html.element.SerialNumber.value
      )
      data.SourceChannel.WebPortNo =
        HtmlTool.get(this.html.element.WebPortNo.value, true) ?? 0
      data.SourceChannel.DeviceModel = HtmlTool.get(
        this.html.element.DeviceModel.value
      )
      return this.business.update(data)
    }
    tocreate() {
      let data = new InputProxyChannel()
      data.Id = 0
      data.Name = this.html.element.Name.value
      data.PositionNo = HtmlTool.get(this.html.element.PositionNo.value, true)
      data.SourceChannel = new VideoSourceChannel()
      data.SourceChannel.HostAddress = this.html.element.HostAddress.value
      data.SourceChannel.PortNo =
        HtmlTool.get(this.html.element.PortNo.value, true) ?? 0
      data.SourceChannel.ProtocolType = this.html.element.ProtocolType
        .value as DeviceProtocolType
      data.SourceChannel.ChannelNo =
        HtmlTool.get(this.html.element.ChannelNo.value, true) ?? 0
      data.SourceChannel.UserName = HtmlTool.get(
        this.html.element.UserName.value
      )
      data.SourceChannel.Password = HtmlTool.get(
        this.html.element.Password.value
      )
      data.SourceChannel.DeviceId = HtmlTool.get(
        this.html.element.DeviceId.value
      )
      data.SourceChannel.SerialNumber = HtmlTool.get(
        this.html.element.SerialNumber.value
      )
      data.SourceChannel.WebPortNo =
        HtmlTool.get(this.html.element.WebPortNo.value, true) ?? 0
      data.SourceChannel.DeviceModel = HtmlTool.get(
        this.html.element.DeviceModel.value
      )
      return this.business.create(data)
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
