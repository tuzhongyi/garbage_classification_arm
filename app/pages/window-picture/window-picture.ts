import { LocationTool } from '../../common/tools/location.tool'
import { PictureWindowHtmlController } from './window-picture.html.controller'
import { PictureWindowMessage } from './window-picture.message'

export namespace PictureWindow {
  class Controller {
    constructor() {
      this.regist()
      this.init()
    }
    private html = new PictureWindowHtmlController()
    private message = new PictureWindowMessage()

    get query() {
      return LocationTool.query.decode(location.search)
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
    }

    init() {
      this.html.load(this.query)
    }

    onclose() {
      this.message.close()
    }
  }

  const controller = new Controller()
}
