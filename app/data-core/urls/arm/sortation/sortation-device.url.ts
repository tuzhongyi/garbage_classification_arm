import { AbstractUrl } from '../../abstract.url'
import { ArmSortationDeviceCalibrationUrl } from './sortation-calibration.url'

export class ArmSortationDeviceUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Devices`)
  }

  search() {
    return `${this.basic()}/Search`
  }

  testing(id: string) {
    return `${this.item(id)}/Testing`
  }

  command(id: string) {
    return `${this.item(id)}/Commands`
  }

  calibration(id?: string) {
    let url = id ? this.item(id) : this.basic()
    return new ArmSortationDeviceCalibrationUrl(url)
  }
}
