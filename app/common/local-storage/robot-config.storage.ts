import { DeviceRobotPlayEChartDisplay } from '../../pages/device-robot-play/controller/details/device-robot-play-chart-display.model'
import { IStorage } from './local-storage.model'

export class RobotConfigStorage
  implements IStorage<DeviceRobotPlayEChartDisplay | undefined>
{
  key: string = 'robot-config'
  get(): DeviceRobotPlayEChartDisplay | undefined {
    let str = localStorage.getItem(this.key)
    if (str) {
      return JSON.parse(str) as DeviceRobotPlayEChartDisplay
    }
    return undefined
  }
  save(v: DeviceRobotPlayEChartDisplay): void {
    let str = JSON.stringify(v)
    localStorage.setItem(this.key, str)
  }
  clear(): void {
    localStorage.removeItem(this.key)
  }
}
