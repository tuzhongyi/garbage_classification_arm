import { AbstractUrl } from '../../abstract.url'
import { SystemInputProxyChannelsUrl } from './system-input-proxy-channel.url'

export class SystemInputProxyUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/InputProxy`)
  }

  get search() {
    return `${this.basic}/Search`
  }

  get channel() {
    return new SystemInputProxyChannelsUrl(this.basic)
  }
}
