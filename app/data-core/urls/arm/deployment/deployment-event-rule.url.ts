import { AbstractUrl } from '../../abstract.url'

export class DeploymentEventsRulesUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Rules`)
  }
}
