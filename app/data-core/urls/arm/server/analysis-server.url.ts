import { AbstractUrl } from '../../abstract.url'
import { AnalysisServerSourceUrl } from './analysis-server-source.url'

export class AnalysisServerUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/AnalysisServers`)
  }

  source(id: string) {
    return new AnalysisServerSourceUrl(this.item(id))
  }

  analyzer(id: string) {
    return `${this.item(id)}/Analyzers`
  }

  event() {
    return `${this.basic()}/Events`
  }

  capability() {
    return `${this.basic()}/Capability`
  }
}
