import { Manager } from '../../data-core/requests/managers/manager'

export class DeviceRobotCapability {
  constructor() {
    this.init()
  }
  private element = {
    Calibration: document.getElementsByName('Capability.Calibration'),
  }

  init() {
    Manager.capability.robot.then((x) => {
      if (!x.Calibration) {
        this.element.Calibration.forEach((item) => {
          item.style.display = 'none'
        })
      }
    })
  }
}
