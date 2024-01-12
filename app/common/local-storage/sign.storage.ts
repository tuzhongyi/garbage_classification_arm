import { IStorage } from './local-storage.model'

export interface ISign {
  username: string
  password: string
}

export class SignStorage implements IStorage<ISign | undefined> {
  key: string = 'sign'
  get(): ISign | undefined {
    let item = sessionStorage.getItem(this.key)
    if (item) {
      return JSON.parse(item)
    }
    return undefined
  }
  save(v: ISign): void {
    sessionStorage.setItem(this.key, JSON.stringify(v))
  }

  clear() {
    sessionStorage.removeItem(this.key)
  }
}
