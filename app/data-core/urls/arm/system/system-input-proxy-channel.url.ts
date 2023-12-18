import { AbstractUrl } from '../../abstract.url'

export class SystemInputProxyChannelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Channels`)
  }

  picture(stream: number, type?: string) {
    let type_params = ''
    if (type) {
      type_params = `&ImageType=${type}`
    }
    return `${this.basic}/Picture?StreamingChannel=${stream}${type_params}`
  }
}
