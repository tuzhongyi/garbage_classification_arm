import { EventType } from '../../../data-core/enums/event-type.enum'
import { CameraAIEventRule } from '../../../data-core/models/arm/analysis/rules/camera-ai-event-rule.model'
import { AIEventRuleDetailsChannelBusiness } from './ai-event-rule-details-channel.business'
import { AIEventRuleDetailsDeploymentBusiness } from './ai-event-rule-details-deployment.business'

export class AIEventRuleDetailsBusiness {
  private channel = new AIEventRuleDetailsChannelBusiness()
  private deployment = new AIEventRuleDetailsDeploymentBusiness()

  channels() {
    return this.channel.load()
  }
  aimodels(type: EventType, id: string) {
    return this.deployment.aimodels(type, parseInt(id))
  }

  load(type: EventType, id: string) {
    return this.deployment.get(type, id)
  }
  create(data: CameraAIEventRule) {
    return this.deployment.create(data)
  }
  update(data: CameraAIEventRule) {
    return this.deployment.update(data)
  }
  picture(id: string) {
    return this.channel.picture(id)
  }
}
