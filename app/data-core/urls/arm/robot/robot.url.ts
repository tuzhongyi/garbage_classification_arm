import { BaseUrl } from '../../base.url'
import { RobotCommandUrl } from './robot-command.url'
import { RobotMeshEdgesUrl } from './robot-mesh-edge.url'
import { RobotMeshNodeUrl } from './robot-mesh-node.url'

export class ArmRobotUrl {
  static basic() {
    return `${BaseUrl.arm}/Robots`
  }
  static item(id: string) {
    return `${this.basic()}/${id}`
  }
  static device = {
    types: () => {
      return `${this.basic()}/DeviceTypes`
    },
    errors: (id: string) => {
      return `${this.item(id)}/DeviceErrors`
    },
  }

  static search(timeout?: number, type?: string) {
    let question = ''
    let and = ''
    let _timeout = ''
    let _type = ''
    if (timeout != undefined) {
      question = '?'
      _timeout = `Timeout=${timeout}`
    }
    if (type != undefined) {
      question = '?'
      _type = `DeviceType=${type}`
    }
    if (_timeout && _type) {
      and = '&'
    }

    return `${this.basic()}/Search${question}${_timeout}${and}${_type}`
  }

  static battery(id: string) {
    return `${this.item(id)}/Battery`
  }
  static location(id: string) {
    return `${this.item(id)}/Location`
  }
  static command(id: string) {
    return new RobotCommandUrl(this.item(id))
  }
  static calibration = {
    start: (id: string) => {
      return `${this.item(id)}/StartCalibration`
    },
    stop: (id: string) => {
      return `${this.item(id)}/StopCalibration`
    },
    status: (id: string) => {
      return `${this.item(id)}/Calibration`
    },
  }
  static mesh = {
    node: (id: string) => {
      return new RobotMeshNodeUrl(this.item(id))
    },
    edge: (id: string) => {
      return new RobotMeshEdgesUrl(this.item(id))
    },
  }
  static capability(type: string) {
    return `${this.item(type)}/Capability`
  }
  static Logs(id: string) {
    return `${this.item(id)}/Logs`
  }
}
