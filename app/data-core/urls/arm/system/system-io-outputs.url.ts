import { AbstractUrl } from '../../abstract.url'

export class SystemIOOutputsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Outputs`)
  }

  state<T = string>(id: T) {
    return `${this.item(id)}/State`
  }

  worksheet<T = string>(id: T) {
    return `${this.item(id)}/WorkSheet`
  }
}
