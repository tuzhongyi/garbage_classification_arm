import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { LocationTool } from '../../common/tools/location.tool'
import { CompactorCommandType } from '../../data-core/enums/compactor/compactor-command-type.enum'
import { DeviceCompactorOperationBusiness } from './device-compactor-operation.business'
import { DeviceCompactorOperationHtmlController } from './device-compactor-operation.html.controller'
import { DeviceCompactorOperationMessage } from './device-compactor-operation.message'
import { DeviceCompactorOperationWindow } from './device-compactor-operation.window'

export namespace DeviceCompactorOperation {
  class Controller {
    constructor() {
      this.regist()
      this.run()
    }
    private html = new DeviceCompactorOperationHtmlController()
    private business = new DeviceCompactorOperationBusiness()
    private message = new DeviceCompactorOperationMessage()
    private window = new DeviceCompactorOperationWindow()
    get id() {
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }

    handle?: NodeJS.Timer

    async load() {
      if (this.id) {
        let data = await this.business.load(this.id)
        if (!data) {
          this.clear()
          this.onstop(true)
        }
        this.html.compression.load(data)
        if (data.Finished) {
          this.onstop(true)
        }
      }
    }

    regist() {
      this.html.compression.event.on('start', () => {
        this.window.confirm.clear()
        this.window.confirm.start = true
        this.window.confirm.message = '是否启动压缩任务？'
        this.message.compression_confirm(this.window.confirm)
      })
      this.html.compression.event.on('stop', () => {
        this.window.confirm.clear()
        this.window.confirm.stop = true
        EnumTool.compactor.CompactorState
        this.window.confirm.message = '是否停止压缩任务？'
        this.message.compression_confirm(this.window.confirm)
      })
      this.html.command.event.on('command', async (command) => {
        this.window.confirm.clear()
        this.window.confirm.command = command
        this.window.confirm.message = `是否执行 ${await EnumTool.compactor.CommandTypes(
          command
        )} 操作？`
        this.message.command_confirm(this.window.confirm)
      })

      this.message.event.on('compression', () => {
        if (this.window.confirm.start) {
          this.onstart()
        }
        if (this.window.confirm.stop) {
          this.onstop()
        }
      })

      this.message.event.on('command', () => {
        if (this.window.confirm.command) {
          this.oncommand(this.window.confirm.command)
        }
      })
    }
    oncommand(command: CompactorCommandType) {
      this.business
        .command(this.id, command)
        .then(() => {
          MessageBar.success('操作成功')
        })
        .catch((e) => {
          MessageBar.error('操作失败')
        })
    }

    onstart() {
      this.business
        .start(this.id)
        .then((x) => {
          MessageBar.success('启动成功')
          this.html.compression.load(x)
          this.run()
        })
        .catch((e) => {
          MessageBar.error('启动失败')
        })
    }
    onstop(finished = false) {
      this.business
        .stop(this.id)
        .then((x) => {
          MessageBar.success(finished ? '操作完成' : '停止成功')
        })
        .finally(() => {
          this.clear()
        })
    }

    run() {
      this.handle = setTimeout(() => {
        this.load().then(() => {
          this.run()
        })
      }, 1000)
    }
    clear() {
      if (this.handle) {
        clearTimeout(this.handle)
        this.handle = undefined
      }
      this.html.compression.clear()
      throw new Error()
    }
  }

  const controller = new Controller()
}
