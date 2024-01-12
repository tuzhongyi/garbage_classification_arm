import { IStorage } from './local-storage.model'

export class NavigationDeviceRobotStorage
  implements IStorage<{ index: number; id?: string }>
{
  key: string = 'navigation_device_robot'

  get(): { index: number; id?: string } {
    let plain = localStorage.getItem(this.key)
    let index = {
      index: 0,
    }
    if (plain) {
      index = JSON.parse(plain)
    }
    return index
  }
  clear() {
    sessionStorage.removeItem(this.key)
  }
  save(v: { index: number; id?: string }): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }
}
