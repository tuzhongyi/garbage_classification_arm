import { AbstractUrl } from '../../abstract.url'

export class AnalysisServerSourceUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Sources`)
  }
}
