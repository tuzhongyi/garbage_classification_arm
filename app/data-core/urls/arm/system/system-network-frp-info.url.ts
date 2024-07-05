import { AbstractUrl } from '../../abstract.url'

export class SystemNetworkFrpInfosUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/FrpInfos`)
  }
}
