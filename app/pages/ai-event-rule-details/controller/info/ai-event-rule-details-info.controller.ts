import { EventType } from '../../../../data-core/enums/event-type.enum'
import { DropWarningRule } from '../../../../data-core/models/arm/analysis/rules/drop-warning-rule.model'
import { GarbageDropRule } from '../../../../data-core/models/arm/analysis/rules/garbage-drop-rule.model'
import { IllegalDropRule } from '../../../../data-core/models/arm/analysis/rules/illegal-drop-rule.model'
import { MixedIntoRule } from '../../../../data-core/models/arm/analysis/rules/mixed-into-rule.model'
import { IAIEventRuleController } from '../../ai-event-rule-details.model'
import { AIEventRuleDetailsDropWarningController } from './ai-event-rule-details-drop-warning.controller'
import { AIEventRuleDetailsGarbageDropController } from './ai-event-rule-details-garbage-drop.controller'
import { AIEventRuleDetailsIllegalDropController } from './ai-event-rule-details-illegal-drop.controller'
import { AIEventRuleDetailsMixedIntoController } from './ai-event-rule-details-mixed-into.controller'

type RuleType =
  | DropWarningRule
  | GarbageDropRule
  | IllegalDropRule
  | MixedIntoRule

export class AIEventRuleDetailsInfoControllerFactory {
  static create(type: EventType): IAIEventRuleController<RuleType> {
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
