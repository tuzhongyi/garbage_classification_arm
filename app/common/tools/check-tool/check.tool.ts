import { NTPTimeMode } from '../../../data-core/enums/ntp-time-mode.enum'
import { AnalysisServer } from '../../../data-core/models/arm/analysis/analysis-server.model'
import { CameraAIEventRule } from '../../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { DropWarningRule } from '../../../data-core/models/arm/analysis/rules/drop-warning-rule.model'
import { GarbageDropRule } from '../../../data-core/models/arm/analysis/rules/garbage-drop-rule.model'
import { IllegalDropRule } from '../../../data-core/models/arm/analysis/rules/illegal-drop-rule.model'
import { MixedIntoRule } from '../../../data-core/models/arm/analysis/rules/mixed-into-rule.model'
import { TrashCanWarningParams } from '../../../data-core/models/arm/analysis/trash-can-warning-params.model'
import { ChannelCalibration } from '../../../data-core/models/arm/channel-calibration.model'
import { InputProxyChannel } from '../../../data-core/models/arm/input-proxy-channel.model'
import { SystemTime } from '../../../data-core/models/arm/system-time.model'
import { ResultArgs } from '../../../pages/main/main.event'

export class CheckTool {
  static SystemTime(data: SystemTime): ResultArgs {
    if (!data.TimeMode) {
      return {
        result: false,
        message: '时间模式为空',
        inner: true,
      }
    }
    if (!data.LocalTime) {
      return {
        result: false,
        message: '本地时间为空',
        inner: true,
      }
    }
    if (data.TimeMode === NTPTimeMode.NTP) {
      if (!data.NTPServer) {
        return {
          result: false,
          message: 'NTP服务为空',
          inner: true,
        }
      }
      if (!data.NTPServer.HostAddress) {
        return {
          result: false,
          message: '请填写NTP服务地址',
          inner: true,
        }
      }
      if (data.NTPServer.PortNo >= 0) {
        return {
          result: false,
          message: '请填写服务器端口号',
          inner: true,
        }
      }
      if (data.NTPServer.SynchronizeInterval > 0) {
        return {
          result: false,
          message: '请填写校时时间间隔',
          inner: true,
        }
      }
    }

    return {
      result: true,
    }
  }
  static ChannelCalibration(data: ChannelCalibration): ResultArgs {
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
    if (data.SourceChannel.PortNo < 0 || 65535 < data.SourceChannel.PortNo) {
      return {
        result: false,
        message: '设备端口号范围为0-65535',
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

    if (data.PositionNo) {
      if (data.PositionNo < 1 || 30 < data.PositionNo) {
        return {
          result: false,
          message: '摄像机机位编号范围为1-30',
          inner: true,
        }
      }
    }

    return {
      result: true,
    }
  }

  static AnalysisServer(data: AnalysisServer): ResultArgs {
    if (!data.IPAddress) {
      return {
        result: false,
        message: '请填写服务器IP地址',
        inner: true,
      }
    }
    if (!Number.isFinite(data.Port)) {
      return {
        result: false,
        message: '请填写服务器端口号',
        inner: true,
      }
    }
    if (data.Port < 0 || 65535 < data.Port) {
      return {
        result: false,
        message: '服务器端口号范围为0-65535',
        inner: true,
      }
    }
    if (!data.ProtocolType) {
      return {
        result: false,
        message: '请选择协议类型',
        inner: true,
      }
    }
    return {
      result: true,
    }
  }

  static CameraAIEventRule(data: CameraAIEventRule): ResultArgs {
    if (!data.EventType) {
      return {
        result: false,
        message: '请选择事件类型',
        inner: true,
      }
    }
    if (data.ChannelId == undefined) {
      return {
        result: false,
        message: '请选择代理通道',
        inner: true,
      }
    }
    if (!data.RuleName) {
      return {
        result: false,
        message: '请输入规则名称',
        inner: true,
      }
    }
    if (!data.ModelId) {
      return {
        result: false,
        message: '请选择AI模型',
        inner: true,
      }
    }
    if (
      !data.ModelRule ||
      !data.ModelRule.Regions ||
      data.ModelRule.Regions.length == 0
    ) {
      return {
        result: false,
        message: '请绘制识别区域',
        inner: true,
      }
    }

    if (data.ModelRule instanceof MixedIntoRule) {
      if (data.ModelRule.Duration < 0 || data.ModelRule.Duration > 1800) {
        return {
          result: false,
          message: '持续时间范围为0-1800',
          inner: true,
        }
      }
      if (data.ModelRule.Confidence < 0 || data.ModelRule.Confidence > 100) {
        return {
          result: false,
          message: '目标置信度范围为0-100',
          inner: true,
        }
      }
      if (data.ModelRule.TargetRatio < 0 || data.ModelRule.TargetRatio > 100) {
        return {
          result: false,
          message: '目标在区域内面积占比范围为0-100',
          inner: true,
        }
      }
      if (
        data.ModelRule.TrashCanRatio < 0 ||
        data.ModelRule.TrashCanRatio > 100
      ) {
        return {
          result: false,
          message: '目标在垃圾桶内占比范围为0-100',
          inner: true,
        }
      }
    } else if (data.ModelRule instanceof DropWarningRule) {
      if (data.ModelRule.Duration < 0 || data.ModelRule.Duration > 1800) {
        return {
          result: false,
          message: '持续时间范围为0-1800',
          inner: true,
        }
      }
      if (data.ModelRule.Confidence < 0 || data.ModelRule.Confidence > 100) {
        return {
          result: false,
          message: '目标置信度范围为0-100',
          inner: true,
        }
      }
      if (data.ModelRule.TargetRatio < 0 || data.ModelRule.TargetRatio > 100) {
        return {
          result: false,
          message: '目标在区域内面积占比范围为0-100',
          inner: true,
        }
      }
    } else if (data.ModelRule instanceof IllegalDropRule) {
      if (data.ModelRule.Duration < 0 || data.ModelRule.Duration > 1800) {
        return {
          result: false,
          message: '持续时间范围为0-1800',
          inner: true,
        }
      }
      if (data.ModelRule.Confidence < 0 || data.ModelRule.Confidence > 100) {
        return {
          result: false,
          message: '目标置信度范围为0-100',
          inner: true,
        }
      }
      if (data.ModelRule.TargetRatio < 0 || data.ModelRule.TargetRatio > 100) {
        return {
          result: false,
          message: '目标在区域内面积占比范围为0-100',
          inner: true,
        }
      }

      if (
        data.ModelRule.OverlapRatio < 0 ||
        data.ModelRule.OverlapRatio > 100
      ) {
        return {
          result: false,
          message: '目标重叠比例范围为0-100',
          inner: true,
        }
      }
    } else if (data.ModelRule instanceof GarbageDropRule) {
      if (data.ModelRule.Confidence < 0 || data.ModelRule.Confidence > 100) {
        return {
          result: false,
          message: '目标置信度范围为0-100',
          inner: true,
        }
      }
      if (data.ModelRule.TargetRatio < 0 || data.ModelRule.TargetRatio > 100) {
        return {
          result: false,
          message: '目标在区域内面积占比范围为0-100',
          inner: true,
        }
      }

      if (data.ModelRule.MinTargetNumber < 1) {
        return {
          result: false,
          message: '最小目标数量不能小于1',
          inner: true,
        }
      }
      if (data.ModelRule.CountInterval < 1) {
        return {
          result: false,
          message: '数量计数判断间隔不能小于1分钟',
          inner: true,
        }
      }
      if (data.ModelRule.TimeoutInterval < 1) {
        return {
          result: false,
          message: '滞留时长不能小于1分钟',
          inner: true,
        }
      }
      if (data.ModelRule.SuperTimeoutInterval < 1) {
        return {
          result: false,
          message: '滞留时长不能小于1分钟',
          inner: true,
        }
      }
    } else {
      return {
        result: false,
        message: '规则类型错误，请联系管理员',
        inner: true,
      }
    }

    return { result: true }
  }

  static TrashCanWarningParams(data: TrashCanWarningParams) {
    if (data.TrashCanTimeout < 30 || data.TrashCanTimeout > 300) {
      return {
        result: false,
        message: '最长有效时间范围为30-300秒',
        inner: true,
      }
    }
    if (data.NoReplacementTimeout < 30 || data.NoReplacementTimeout > 300) {
      return {
        result: false,
        message: '无可更换垃圾桶时长范围为30-300秒',
        inner: true,
      }
    }
    return { result: true }
  }
}
