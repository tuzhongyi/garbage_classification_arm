import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIModel } from '../../data-core/models/arm/camera-ai-model.model'
import { InputProxyChannel } from '../../data-core/models/arm/input-proxy-channel.model'

export class AIEventRuleDetailsSource {
  channels!: Promise<InputProxyChannel[]>
  aimodels!: Promise<CameraAIModel[]>
  type?: EventType
}
