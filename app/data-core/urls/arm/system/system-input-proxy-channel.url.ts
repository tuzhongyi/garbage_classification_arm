import { AbstractUrl } from '../../abstract.url'

export class SystemInputProxyChannelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Channels`)
  }

  picture() {
    return `${this.basic}/Picture`
  }
}
