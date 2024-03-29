import '../../../assets/styles/table-sticky.less'
import { EventEmitter } from '../../common/event-emitter'
import { DeviceRobotCalibrationHtmlEChartController } from './controller/echarts/device-robot-calibration-html-echart.controller'
import { DeviceRobotCalibrationHtmlTableController } from './controller/tables/device-robot-calibration-html-table.controller'

import { DeviceRobotCalibrationHtmlNodeDetailsController } from './controller/details/device-robot-calibration.html-details-node.controller'
import { DeviceRobotCalibrationEvent } from './device-robot-calibration.event'

import { DeviceRobotModel } from '../device-robot/device-robot.model'
import { DeviceRobotCalibrationHtmlStatusController } from './controller/details/device-robot-calibration.html-status.controller'
import './less/device-robot-calibration-display.less'
import './less/device-robot-calibration-left.less'
import './less/device-robot-calibration-right.less'
import './less/device-robot-calibration.less'

export class DeviceRobotCalibrationHtmlController {
  constructor() {
    this.regist()
  }

  private element = {
    control: {
      top: document.getElementById('btn_top') as HTMLButtonElement,
      down: document.getElementById('btn_down') as HTMLButtonElement,
      left: document.getElementById('btn_left') as HTMLButtonElement,
      right: document.getElementById('btn_right') as HTMLButtonElement,
      rotate: document.getElementById('btn_rotate') as HTMLButtonElement,
      start: document.getElementById('btn_start') as HTMLButtonElement,
      stop: document.getElementById('btn_stop') as HTMLButtonElement,
      clear: document.getElementById('btn_clear') as HTMLButtonElement,
    },

    message: document.getElementById('message') as HTMLDivElement,

    test: document.getElementById('test') as HTMLImageElement,
  }

  get message() {
    return this.element.message
  }
  table = new DeviceRobotCalibrationHtmlTableController()
  echart = new DeviceRobotCalibrationHtmlEChartController()
  event: EventEmitter<DeviceRobotCalibrationEvent> = new EventEmitter()
  details = new DeviceRobotCalibrationHtmlNodeDetailsController()
  status = new DeviceRobotCalibrationHtmlStatusController()

  private regist() {
    this.element.control.top.addEventListener('click', () => {
      this.event.emit('top')
    })
    this.element.control.down.addEventListener('click', () => {
      this.event.emit('down')
    })
    this.element.control.left.addEventListener('click', () => {
      this.event.emit('left')
    })
    this.element.control.right.addEventListener('click', () => {
      this.event.emit('right')
    })
    this.element.control.start.addEventListener('click', () => {
      this.event.emit('start')
    })
    this.element.control.stop.addEventListener('click', () => {
      this.event.emit('stop')
    })
    this.element.control.clear.addEventListener('click', () => {
      this.event.emit('clear')
    })
    this.echart.event.on('select', (data) => {
      this.table.node.select(data.Id)
    })
    this.table.node.event.on('select', (id) => {
      this.echart.select(id)
    })
  }

  clear() {
    this.echart.clear()
  }

  async load(model: DeviceRobotModel) {
    this.echart.load(model)
    this.status.load(await model.robot, await model.battery)
  }

  disable(is: boolean) {
    if (is) {
      this.element.control.top.classList.add('disabled')
      this.element.control.down.classList.add('disabled')
      this.element.control.left.classList.add('disabled')
      this.element.control.right.classList.add('disabled')
    } else {
      this.element.control.top.classList.remove('disabled')
      this.element.control.down.classList.remove('disabled')
      this.element.control.left.classList.remove('disabled')
      this.element.control.right.classList.remove('disabled')
    }
  }

  stop() {
    this.element.control.start.style.display = ''
    this.element.control.stop.style.display = 'none'
  }
  start() {
    this.element.control.start.style.display = 'none'
    this.element.control.stop.style.display = ''
  }
}
