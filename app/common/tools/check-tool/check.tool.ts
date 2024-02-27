import { CalibrationAreaType } from '../../../data-core/enums/calibration_area_type.enum'
import { ChannelCalibration } from '../../../data-core/models/arm/channel-calibration.model'
import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { ResultArgs } from '../../../pages/main/main.event'

export class CheckTool {
  static ChannelCalibration(
    data: ChannelCalibration,
    type?: CalibrationAreaType
  ): ResultArgs {
    if (!data.ChannelId) {
      return {
        result: false,
        message: '请选择代理通道',
        inner: true,
      }
    }
    if (!data.RobotId) {
      return {
        result: false,
        message: '请选择智能机器人',
        inner: true,
      }
    }
    if (!data.LensType) {
      return {
        result: false,
        message: '请选择镜头类型',
        inner: true,
      }
    }
    if (!data.Resolution) {
      return {
        result: false,
        message: '分辨率为空',
        inner: true,
      }
    }
    if (!data.Areas && !data.Points) {
      return {
        result: false,
        message: '请绘制分析目标',
        inner: true,
      }
    }

    switch (type) {
      case CalibrationAreaType.DropPort:
        if (!data.Areas || data.Areas.length === 0) {
          return {
            result: false,
            message: '请绘制分析区域',
            inner: true,
          }
        }
        break
      case CalibrationAreaType.StorePort:
        break
      default:
        break
    }

    return {
      result: true,
    }
  }

  static InputProxyChannel(data: InputProxyChannel): ResultArgs {
    if (!data.Name) {
      return {
        result: false,
        message: '请输入通道名称',
        inner: true,
      }
    }
    if (!data.SourceChannel.HostAddress) {
      return {
        result: false,
        message: '请输入设备IP地址',
        inner: true,
      }
    }
    if (!data.SourceChannel) {
      return {
        result: false,
        message: '数据来源为空',
        inner: true,
      }
    }
    if (!Number.isFinite(data.SourceChannel.PortNo)) {
      return {
        result: false,
        message: '请输入设备端口号',
        inner: true,
      }
    }
    if (!data.SourceChannel.ProtocolType) {
      return {
        result: false,
        message: '请选择协议类型',
        inner: true,
      }
    }
    if (!Number.isFinite(data.SourceChannel.ChannelNo)) {
      return {
        result: false,
        message: '请输入设备视频通道编号',
        inner: true,
      }
    }

    return {
      result: true,
    }
  }
}
