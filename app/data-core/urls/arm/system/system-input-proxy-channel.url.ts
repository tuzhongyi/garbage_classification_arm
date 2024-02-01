import { AbstractUrl } from '../../abstract.url'

export class SystemInputProxyChannelsUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Channels`)
  }

  picture(id: string, stream: number, type: string) {
    let type_params = ''
    if (type) {
      type_params = `&ImageType=${type}`
    }
    return `${this.item(id)}/Picture?StreamingChannel=${stream}${type_params}`
  }

  calibration(id: string) {
    return `${this.item(id)}/Calibration`
  }
}
