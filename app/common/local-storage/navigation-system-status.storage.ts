import { IStorage } from './local-storage.model'

export class NavigationSystemStatusStorage implements IStorage<number> {
  key: string = 'navigation_system_status'
  get(): number {
    let plain = localStorage.getItem(this.key)
    let index = 0
    if (plain) {
      index = parseInt(plain)
    }
    return index
  }
  clear() {
    sessionStorage.removeItem(this.key)
  }
  save(v: number): void {
    localStorage.setItem(this.key, v.toString())
  }
}
