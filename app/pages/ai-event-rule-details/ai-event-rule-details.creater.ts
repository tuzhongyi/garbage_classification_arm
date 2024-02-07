import { EventType } from '../../data-core/enums/event-type.enum'
import { DropWarningRule } from '../../data-core/models/arm/analysis/rules/drop-warning-rule.model'
import { GarbageDropRule } from '../../data-core/models/arm/analysis/rules/garbage-drop-rule.model'
import { IllegalDropRule } from '../../data-core/models/arm/analysis/rules/illegal-drop-rule.model'
import { MixedIntoRule } from '../../data-core/models/arm/analysis/rules/mixed-into-rule.model'

export class AIEventRuleDetailsCreater {
  static fromType(type: EventType) {
    switch (type) {
      case EventType.IllegalDrop:
        return this.IllegalDropRule()
      case EventType.MixedInto:
        return this.MixedIntoRule()
      case EventType.DropWarning:
        return this.DropWarningRule()
      case EventType.GarbageDrop:
        return this.GarbageDrop()
      default:
        throw new Error(
          `AIEventRuleDetailsCreater:fromType: Invalid type ${type}`
        )
    }
  }

  private static IllegalDropRule() {
    let rule = new IllegalDropRule()
    rule.Regions = []
    return rule
  }

  private static MixedIntoRule() {
    let rule = new MixedIntoRule()
    rule.Regions = []
    return rule
  }

  private static GarbageDrop() {
    let rule = new GarbageDropRule()
    rule.Regions = []
    return rule
  }
  private static DropWarningRule() {
    let rule = new DropWarningRule()
    rule.Regions = []
    return rule
  }
}
