import { SystemMaintainCommandBusiness } from './system-maintain-command.business'
import { SystemMaintainCommandHtmlController } from './system-maintain-command.html.controller'

export namespace SystemMaintainCommand {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new SystemMaintainCommandHtmlController()
    private business = new SystemMaintainCommandBusiness()

    private regist() {
      this.html.event.on('command', (command: string) => {
        this.business.command(command).then((x) => {
          this.html.load(x)
        })
      })
    }
  }

  let controller = new Controller()
}
