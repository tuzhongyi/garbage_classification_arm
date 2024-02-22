import { EventType } from '../../../enums/event-type.enum'
import { AbstractUrl } from '../../abstract.url'
import { DeploymentEventsRulesUrl } from './deployment-event-rule.url'

export class DeploymentEventsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Events`)
  }

  rule(type: EventType) {
    return new DeploymentEventsRulesUrl(this.item(type))
  }

  ai = {
    models: () => {
      return `${this.basic()}/AIModels`
    },
  }
}
