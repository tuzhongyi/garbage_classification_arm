import { DeviceProtocolType } from '../../data-core/enums/device-protocol-type.enum'
import { ProxyChannelState } from '../../data-core/enums/proxy-channel-state.enum'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'
import { VideoSourceChannel } from '../../data-core/models/arm/video-source-channel.model'
import { HowellHttpClient } from '../../data-core/requests/http-client'
import { ArmSystemRequestService } from '../../data-core/requests/services/system/system.service'

export class DeviceChannelListBusiness {
  client = new HowellHttpClient.HttpClient()
  service = new ArmSystemRequestService(this.client.http)

  async load() {
    let datas = await this.getData()
    if (!datas || datas.length == 0) {
      datas = []
      for (let i = 0; i < 10; i++) {
        let item = new InputProxyChannel()
        item.Id = i
        item.Name = '通道' + i
        item.ChannelState = ProxyChannelState.Online
        item.PositionNo = (i + 1) % 30
        item.SourceChannel = new VideoSourceChannel()
        item.SourceChannel.ChannelNo = 1
        item.SourceChannel.HostAddress = '192.168.1.' + (i + 1)
        item.SourceChannel.PortNo = 5198
        item.SourceChannel.UserName = 'admin'
        item.SourceChannel.Password = '12345'
        item.SourceChannel.SerialNumber = i.toString()
        item.SourceChannel.ProtocolType = DeviceProtocolType.Howell8000
        item.SourceChannel.DeviceModel = 'G5'
        item.SourceChannel.WebPortNo = 80
        datas.push(item)
      }
    }
    return datas
  }

  getData() {
    return this.service.input.proxy.channel.array()
  }

  delete(ids: string[]) {
    let all = ids.map((id) => {
      return this.service.input.proxy.channel.delete(id)
    })
    return Promise.all(all)
  }
}
