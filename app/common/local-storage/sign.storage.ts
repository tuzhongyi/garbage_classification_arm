import { IStorage } from './local-storage.model'

export interface ISign {
  username: string
  password: string
}

export class SignStorage implements IStorage<ISign | undefined> {
  key: string = 'sign'
  get(): ISign | undefined {
    let item = localStorage.getItem(this.key)
    if (item) {
      return JSON.parse(item)
    }
    return undefined
  }
  save(v: ISign): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}
