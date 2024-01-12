import { EventEmitter } from '../../common/event-emitter'
import { SSH } from '../../data-core/models/arm/ssh.model'
import { NetworkConfigSSHEvent } from './network-config-ssh.event'

import './network-config-ssh.less'

export class NetworkConfigSSHHtmlController {
  constructor() {}

  element = {
    Enabled: document.getElementById('Enabled') as HTMLSelectElement,
    save: document.getElementById('save') as HTMLButtonElement,
  }
  event: EventEmitter<NetworkConfigSSHEvent> = new EventEmitter()

  load(data: SSH) {
    this.element.Enabled.value = JSON.stringify(data.Enabled)
  }
}
