import { TrashCanRecord } from '../../data-core/models/arm/analysis/trash-can-record'
import { Page } from '../../data-core/models/page-list.model'
import { DeviceTrashCanLogBusiness } from './device-trashcan-log.business'
import { DeviceTrashCanLogHtmlController } from './device-trashcan-log.html.controller'
import { DeviceTrashCanLogTableArgs } from './device-trashcan-log.model'

export namespace DeviceTrashCanLog {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new DeviceTrashCanLogHtmlController()
    private business = new DeviceTrashCanLogBusiness()
    args = new DeviceTrashCanLogTableArgs()
    datas: TrashCanRecord[] = []
    page?: Page

    async init() {}

    regist() {
      this.html.event.on('datechange', (date) => {
        this.args.date = date
      })
      this.html.event.on('search', () => {
        this.load(1)
      })
      this.html.table.event.on('page', (index) => {
        this.load(index)
      })
    }

    async load(index: number, size: number = 12) {
      let paged = await this.business.load(index, size, this.args)
      this.datas = paged.Data
      this.page = paged.Page
      this.html.table.load(this.datas, this.page)
    }
  }

  let controller = new Controller()
}
