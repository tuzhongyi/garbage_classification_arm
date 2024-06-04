import { IStorage } from './local-storage.model'
import { NavigationAIAnalysisServerStorage } from './navigation-ai-analysis-server.storage'
import { NavigationAIEventStorage } from './navigation-ai-event.storage'
import { NavigationAIModelStorage } from './navigation-ai-model.storage'
import { NavigationDeviceChannelStorage } from './navigation-device-channel.storage'
import { NavigationDeviceRobotStorage } from './navigation-device-robot.storage'
import { NavigationDeviceSortationStorage } from './navigation-device-sortation.storage'
import { NavigationDeviceTrashCanStorage } from './navigation-device-trashcan.storage'
import { NavigationEventRecordStorage } from './navigation-event-record.storage'
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
    let system = this.system as any
    for (const key in system) {
      system[key].clear()
    }
    let network = this.network as any
    for (const key in network) {
      network[key].clear()
    }
    let device = this.device as any
    for (const key in device) {
      device[key].clear()
    }
    let ai = this.ai as any
    for (const key in ai) {
      ai[key].clear()
    }
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
    sortation: new NavigationDeviceSortationStorage(),

    trashcan: new NavigationDeviceTrashCanStorage(),
    channel: new NavigationDeviceChannelStorage(),
  }
  ai = {
    model: new NavigationAIModelStorage(),
    event: new NavigationAIEventStorage(),
    server: new NavigationAIAnalysisServerStorage(),
  }
  event = {
    record: new NavigationEventRecordStorage(),
  }
}
