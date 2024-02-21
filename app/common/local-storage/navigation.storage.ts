import { IStorage } from './local-storage.model'
import { NavigationAIEventStorage } from './navigation-ai-event.storage'
import { NavigationAIModelStorage } from './navigation-ai-model.storage'
import { NavigationDeviceChannelStorage } from './navigation-device-channel.storage'
import { NavigationDeviceRobotStorage } from './navigation-device-robot.storage'
import { NavigationNetworkConfigStorage } from './navigation-network-config.storage'
import { NavigationNetworkServerStorage } from './navigation-network-server.storage'
import { NavigationSystemDeviceStorage } from './navigation-system-device.storage'
import { NavigationSystemMaintainStorage } from './navigation-system-maintain.storage'
import { NavigationSystemStatusStorage } from './navigation-system-status.storage'

export class NavigationIndex {
  extend: string = 'system'
  selected: string = 'system_device'
}
export class NavigationStorage implements IStorage<NavigationIndex> {
  key: string = 'navigation'
  get(): NavigationIndex {
    let plain = localStorage.getItem(this.key)
    let index: NavigationIndex
    if (plain) {
      index = JSON.parse(plain)
    } else {
      index = new NavigationIndex()
    }
    return index
  }
  save(v: NavigationIndex): void {
    localStorage.setItem(this.key, JSON.stringify(v))
  }
  clear() {
    localStorage.removeItem(this.key)
    this.system.device.clear()
    this.system.status.clear()
    this.system.maintain.clear()
    this.network.config.clear()
    this.network.server.clear()
    this.device.channel.clear()
    this.device.robot.clear()
    this.ai.model.clear()
    this.ai.event.clear()
  }

  system = {
    device: new NavigationSystemDeviceStorage(),
    status: new NavigationSystemStatusStorage(),
    maintain: new NavigationSystemMaintainStorage(),
  }
  network = {
    config: new NavigationNetworkConfigStorage(),
    server: new NavigationNetworkServerStorage(),
  }
  device = {
    robot: new NavigationDeviceRobotStorage(),
    channel: new NavigationDeviceChannelStorage(),
  }
  ai = {
    model: new NavigationAIModelStorage(),
    event: new NavigationAIEventStorage(),
  }
}
