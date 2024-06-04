import { IStorage } from './local-storage.model'

export class NavigationDeviceSortationStorage
  implements IStorage<{ index: number; id?: string }>
{
  key: string = 'navigation_device_sortation'

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
    localStorage.removeItem(this.key)
  }
  save(v: { index: number; id?: string }): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }
}
