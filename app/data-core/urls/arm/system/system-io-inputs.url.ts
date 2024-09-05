import { AbstractUrl } from '../../abstract.url'

export class SystemIOInputsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Inputs`)
  }
}
