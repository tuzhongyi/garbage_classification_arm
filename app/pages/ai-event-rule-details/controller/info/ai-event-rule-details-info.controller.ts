import { EventType } from '../../../../data-core/enums/event-type.enum'
import { AIEventRuleDetailsDropWarningController } from './ai-event-rule-details-drop-warning.controller'
import { AIEventRuleDetailsGarbageDropController } from './ai-event-rule-details-garbage-drop.controller'
import { AIEventRuleDetailsIllegalDropController } from './ai-event-rule-details-illegal-drop.controller'
import { AIEventRuleDetailsMixedIntoController } from './ai-event-rule-details-mixed-into.controller'

export class AIEventRuleDetailsInfoControllerFactory {
  static create(type: EventType) {
    switch (type) {
      case EventType.IllegalDrop:
        return new AIEventRuleDetailsIllegalDropController()
      case EventType.MixedInto:
        return new AIEventRuleDetailsMixedIntoController()
      case EventType.DropWarning:
        return new AIEventRuleDetailsDropWarningController()
      case EventType.GarbageDrop:
        return new AIEventRuleDetailsGarbageDropController()
      default:
        throw new Error(
          `AIEventRuleDetailsInfoControllerFactory: 不存在该类型 ${type}`
        )
    }
  }
}
