import { AbstractUrl } from '../../abstract.url'

export class ArmSortationDeviceCalibrationUrl extends AbstractUrl {
  constructor(base: string) {
    super(`${base}/Calibration`)
  }

  grid() {
    return `${this.basic()}/Grids`
  }
}
