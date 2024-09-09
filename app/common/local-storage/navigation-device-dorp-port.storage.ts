import { IStorage } from './local-storage.model'

export class NavigationDeviceDorpPortStorage implements IStorage<number> {
  key: string = 'navigation_device_dorp_port'
  get(): number {
    let plain = localStorage.getItem(this.key)
    let index = 0
    if (plain) {
      index = parseInt(plain)
    }
    return index
  }
  clear() {
    localStorage.removeItem(this.key)
  }
  save(v: number): void {
    localStorage.setItem(this.key, v.toString())
  }
}

export class NavigationDeviceDorpStorage {
  port = new NavigationDeviceDorpPortStorage()

  get(): number {
    throw new Error('Method not implemented.')
  }
  save(v: number): void {
    throw new Error('Method not implemented.')
  }
  clear(): void {
    this.port.clear()
  }
}
