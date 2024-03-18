import { EventEmitter } from '../../../../common/event-emitter'
import { DeviceRobotPlayEChartDisplay } from './device-robot-play-chart-display.model'

interface DeviceRobotPlayEChartDisplayEvent {
  robot(value: boolean): void
  label(value: boolean): void
}
export class DeviceRobotPlayEChartDisplayController {
  event = new EventEmitter<DeviceRobotPlayEChartDisplayEvent>()
  constructor() {
    this.regist()
  }
  private element = {
    button: document.querySelector('.config-button') as HTMLInputElement,
    panel: document.querySelector('.config-panel') as HTMLInputElement,
    display: {
      robot: document.getElementById('display_robot') as HTMLInputElement,
      label: document.getElementById('display_label') as HTMLInputElement,
    },
  }

  show = false

  private regist() {
    this.element.display.robot.addEventListener('change', () => {
      this.event.emit('robot', this.element.display.robot.checked)
    })
    this.element.display.label.addEventListener('change', () => {
      this.event.emit('label', this.element.display.label.checked)
    })
    this.element.button.addEventListener('click', () => {
      this.show = !this.show
      let icon = this.element.button.querySelector('i') as HTMLElement
      if (this.show) {
        icon.className = 'mdi mdi-arrow-right-drop-circle-outline'
        this.element.panel.style.display = ''
      } else {
        icon.className = 'mdi mdi-arrow-left-drop-circle-outline'
        this.element.panel.style.display = 'none'
      }
    })
  }

  load(config: DeviceRobotPlayEChartDisplay) {
    this.element.display.robot.checked = config.robot
    this.element.display.label.checked = config.label
  }
}
