import { AbstractUrl } from '../../abstract.url'

export class SystemDropPortUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/DropPorts`)
  }
}
