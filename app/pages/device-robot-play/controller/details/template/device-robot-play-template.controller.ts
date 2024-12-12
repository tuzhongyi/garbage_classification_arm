import { EventEmitter } from '../../../../../common/event-emitter'
import { DeviceRobotPlayMode } from '../../../device-robot-play.model'
import { DeviceRobotPlayDetailsChangeTemplate } from './change/device-robot-play-details-change.template'
import { DeviceRobotPlayDetailsCompactionTemplate } from './compaction/device-robot-play-details-compaction.template'
import {
  IDeviceRobotPlayHtmlTemplate,
  IDeviceRobotPlayHtmlTemplateEvent,
} from './device-robot-play-template.interface'
import { DeviceRobotPlayDetailsSingleTemplate } from './singal/device-robot-play-details-single.template'
import { DeviceRobotPlayDetailsSprayTemplate } from './spray/device-robot-play-details-spray.template'

export class DeviceRobotPlayHtmlTemplateController {
  event = new EventEmitter<IDeviceRobotPlayHtmlTemplateEvent>()
  constructor() {}

  private template?: IDeviceRobotPlayHtmlTemplate

  create(parent: HTMLElement, mode: number): IDeviceRobotPlayHtmlTemplate {
    switch (mode) {
      case DeviceRobotPlayMode.single:
        this.template = new DeviceRobotPlayDetailsSingleTemplate(parent)
        this.template.event.on('move', () => {
          this.event.emit('move')
        })
        this.template.event.on('weigh', () => {
          this.event.emit('weigh')
        })
        break
      case DeviceRobotPlayMode.change:
        this.template = new DeviceRobotPlayDetailsChangeTemplate(parent)
        this.template.event.on('reset', () => {
          this.event.emit('reset')
        })
        this.template.event.on('change', () => {
          this.event.emit('change')
        })
        break
      case DeviceRobotPlayMode.compaction:
        this.template = new DeviceRobotPlayDetailsCompactionTemplate(parent)
        this.template.event.on('reset', () => {
          this.event.emit('reset')
        })
        this.template.event.on('compaction', (args) => {
          this.event.emit('compaction', args)
        })
        break
      case DeviceRobotPlayMode.spray:
        this.template = new DeviceRobotPlayDetailsSprayTemplate(parent)
        this.template.event.on('spray', (args) => {
          this.event.emit('spray', args)
        })
        break
      default:
        throw new Error('Mode not found')
    }
    return this.template
  }

  load(node: any) {
    if (this.template) {
      this.template.load(node)
    }
  }
  clear() {
    if (this.template) {
      this.template.clear()
    }
  }
}
