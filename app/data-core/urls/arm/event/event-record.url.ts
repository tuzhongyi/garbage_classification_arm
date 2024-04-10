import { AbstractUrl } from '../../abstract.url'

export class ArmEventRecordsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Records`)
  }
}
