import { RunningStatus } from '../../data-core/models/arm/running-status.model'
import './system-status-running.less'

export class SystemStatusRunningHtmlController {
  constructor() {
    this.regist()
  }

  element = {
    MemoryUsage: document.getElementById('MemoryUsage') as HTMLInputElement,
    TotalMemory: document.getElementById('TotalMemory') as HTMLInputElement,
    CPUUsage: document.getElementById('CPUUsage') as HTMLInputElement,
    SystemUpTime: document.getElementById('SystemUpTime') as HTMLInputElement,
    ChipType: document.getElementById('ChipType') as HTMLInputElement,
    NetworkSpeed: document.getElementById('NetworkSpeed') as HTMLInputElement,
  }

  regist() {}

  load(data: RunningStatus) {
    this.element.MemoryUsage.value = data.MemoryUsage.toString()
    this.element.TotalMemory.value = data.TotalMemory.toString()
    this.element.CPUUsage.value = data.CPUUsage.toString()
    this.element.SystemUpTime.value = data.SystemUpTime.toString()
    this.element.ChipType.value = data.ChipType ?? ''
    this.element.NetworkSpeed.value = data.NetworkSpeed?.toString() ?? ''
  }
}
