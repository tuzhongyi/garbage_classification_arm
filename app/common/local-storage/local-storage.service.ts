import { NavigationStorage } from './navigation.storage'
import { SessionStorage } from './session.storage'
import { SignStorage } from './sign.storage'

export class LocalStorageService {
  static navigation = new NavigationStorage()
  static session = new SessionStorage()
  static sign = new SignStorage()
}
