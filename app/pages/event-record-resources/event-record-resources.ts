import { LocationTool } from '../../common/tools/location.tool'
import { EventResource } from '../../data-core/models/arm/events/event-resource.model'
import { IPictureWindowQuery } from '../window-picture/window-picture.model'
import { EventRecordResourcesHtmlController } from './controller/event-record-resources.html.controller'
import { EventRecordResourcesBusiness } from './event-record-resources.business'
import { EventRecordResourcesMessage } from './event-record-resources.message'

export namespace EventRecordResources {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new EventRecordResourcesHtmlController()
    private business = new EventRecordResourcesBusiness()
    private message = new EventRecordResourcesMessage()
    data?: EventResource
    index: number = 0
    async load() {
      if (this.id) {
        this.data = await this.business.load(this.id, this.index)
        if (this.data) {
          let query = await this.convert(this.data)

          this.html.load(query, {
            prev: this.index > 0,
            next: this.index < this.business.count() - 1,
          })
          this.html.canvas.load(this.data.Objects, this.data.Rules)
        }
      }
    }

    async convert(source: EventResource) {
      let query: IPictureWindowQuery = {
        title: `${source.ResourceName}`,
        img: await this.business.picture(source.PictureId),
      }
      return query
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
      this.html.event.on('next', this.onnext.bind(this))
      this.html.event.on('prev', this.onprev.bind(this))
      this.html.event.on('inited', () => {
        this.load()
      })
    }

    onprev() {
      this.index--
      if (this.index < 0) {
        this.index = 0
        return
      }
      this.load()
    }

    onnext() {
      this.index++
      this.load()
    }

    onclose() {
      this.message.close()
    }

    get id() {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys.id
    }
  }

  const controller = new Controller()
}
