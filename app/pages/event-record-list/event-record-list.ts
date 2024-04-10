import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { EventRecord } from '../../data-core/models/arm/events/event-record.model'
import { Page } from '../../data-core/models/page-list.model'
import { EventRecordListBusiness } from './event-record-list.business'
import { EventRecordListHtmlController } from './event-record-list.html.controller'
import { EventRecordListMessage } from './event-record-list.message'
import {
  EventRecordListTableArgs,
  EventRecordListWindow,
} from './event-record-list.model'

export namespace EventRecordList {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new EventRecordListHtmlController()
    private business = new EventRecordListBusiness()
    private message = new EventRecordListMessage()
    private window = new EventRecordListWindow()
    args = new EventRecordListTableArgs()
    datas: EventRecord[] = []
    page?: Page

    async init() {}

    regist() {
      this.html.event.on('begin', (date) => {
        this.args.duration.begin = date
      })
      this.html.event.on('end', (date) => {
        this.args.duration.end = date
      })
      this.html.event.on('type', (x) => {
        this.args.type = x
      })
      this.html.event.on('uploaded', (x) => {
        this.args.uploaded = x
      })
      this.html.event.on('search', () => {
        this.load(1)
      })
      this.html.table.event.on('page', (index) => {
        this.load(index)
      })
      this.html.table.event.on('picture', this.onpicture.bind(this))
      this.html.table.event.on('resources', this.onresources.bind(this))
    }

    async load(index: number, size: number = 12) {
      this.html.table.clear()
      this.business.load(index, size, this.args).then((paged) => {
        this.datas = paged.Data
        this.page = paged.Page
        this.html.table.load(this.datas, this.page)
      })
    }

    async onpicture(id: string) {
      let record = this.datas.find((x) => x.Id.toString() === id)
      if (record) {
        this.window.picture.query.title = `${await EnumTool.EventType(
          record.EventType,
          true
        )} ${record.EventTime.format('yyyy-MM-dd HH:mm:ss')}`
      }
      this.window.picture.query.img = this.business.picture(id)
      let width = window.innerWidth * 0.7
      let height = (width / 16) * 9 + 50
      this.window.picture.style.width = `${width}px`
      this.window.picture.style.height = `${height}px`
      this.message.picture(this.window.picture)
    }
    async onresources(id: string) {
      this.window.resources.query.id = id
      let width = window.innerWidth * 0.7
      let height = (width / 16) * 9 + 50
      this.window.resources.style.width = `${width}px`
      this.window.resources.style.height = `${height}px`
      this.message.resources(this.window.resources)
    }
  }

  let controller = new Controller()
}
