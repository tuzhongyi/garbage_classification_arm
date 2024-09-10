import { Manager } from '../../data-core/requests/managers/manager'

export class DeviceRobotCapability {
  constructor() {
    this.init()
  }
  private element = {
    Calibration: document.getElementsByName('Capability.Calibration'),
  }
  private inited = false
  init() {
    Manager.capability.robot
      .then((x) => {
        if (!x.Calibration) {
          this.element.Calibration.forEach((item) => {
            item.style.display = 'none'
          })
        }
        this.inited = true
      })
      .catch(() => {
        this.inited = true
      })
  }
}
