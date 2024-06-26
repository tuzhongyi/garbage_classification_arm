import { AbstractUrl } from '../../abstract.url'

export class AnalysisServerSourceUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Sources`)
  }

  sync() {
    return `${this.basic()}/Sync`
  }

  ias = {
    params: (id: string) => {
      return `${this.item(id)}/IasParams`
    },
  }
}
