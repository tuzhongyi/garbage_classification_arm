import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { IOInputPort } from '../../data-core/models/arm/io/io-input-port.model'
import { SystemIOInputBusiness } from './system-io-input.business'
import { SystemIOInputHtmlController } from './system-io-input.html.controller'
import { SystemIOInputMessage } from './system-io-input.message'
import { SystemIOInputWindow } from './system-io-input.window'

export namespace SystemIOInput {
  class Controller {
    constructor() {
      this.regist()
      this.init().then((x) => {
        this.load()
      })
    }
    private html = new SystemIOInputHtmlController()
    private business = new SystemIOInputBusiness()
    private message = new SystemIOInputMessage()
    private window = new SystemIOInputWindow()
    datas: IOInputPort[] = []

    async init() {
      return this.business.load().then((x) => {
        this.datas = x
        this.html.init(this.datas)
      })
    }

    load(id?: number) {
      if (this.datas.length > 0) {
        if (id) {
          let data = this.datas.find((x) => x.Id === id)
          if (data) {
            this.html.load(data)
          }
        } else {
          this.html.load(this.datas[0])
        }
      }
    }

    private regist() {
      this.html.event.on('select', (id: number) => {
        this.load(id)
      })
      this.html.event.on('save', (data: IOInputPort) => {
        this.window.confirm.message = `是否保存${data.Name}?`
        this.window.confirm.data = data
        this.message.save_confirm(this.window.confirm)
      })
      this.message.event.on('save', this.save.bind(this))
    }

    private save() {
      if (this.window.confirm.data) {
        let id = this.window.confirm.data.Id
        this.business
          .update(this.window.confirm.data)
          .then((x) => {
            MessageBar.success('保存成功')
            this.html.clear()
            this.init().then(() => {
              this.load(id)
            })
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
