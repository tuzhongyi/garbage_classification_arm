import { IStorage } from './local-storage.model'

export class IDigestSession {
  realm: string = ''
  qop: string = ''
  nonce: string = ''
  opaque: string = '';
  [key: string]: string
}

export class SessionStorage implements IStorage<IDigestSession | undefined> {
  key: string = 'challenge'
  get(): IDigestSession | undefined {
    let item = sessionStorage.getItem(this.key)
    if (item) {
      return JSON.parse(item)
    }
    return undefined
  }
  save(v: IDigestSession): void {
    sessionStorage.setItem(this.key, JSON.stringify(v))
  }

  clear() {
    sessionStorage.removeItem(this.key)
  }
}
