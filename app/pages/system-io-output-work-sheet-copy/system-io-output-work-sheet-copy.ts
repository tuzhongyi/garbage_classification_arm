import { instanceToPlain, plainToInstance } from 'class-transformer'
import { LocationTool } from '../../common/tools/location.tool'
import { IOOutputWorkSheet } from '../../data-core/models/arm/io/io-output-work-sheet.model'
import { SystemIOOutputWorkSheetCopyBusiness } from './system-io-output-work-sheet-copy.business'
import { SystemIOOutputWorkSheetCopyHtmlController } from './system-io-output-work-sheet-copy.html.controller'
import { SystemIOOutputWorkSheetCopyMessage } from './system-io-output-work-sheet-copy.message'
import { SystemIOOutputWorkSheetCopyQuery } from './system-io-output-work-sheet-copy.model'

export namespace SystemIOOutputWorkSheetCopy {
  class Controller {
    constructor() {
      this.regist()
      this.load()
    }
    private html = new SystemIOOutputWorkSheetCopyHtmlController()
    private business = new SystemIOOutputWorkSheetCopyBusiness()
    private message = new SystemIOOutputWorkSheetCopyMessage()
    private get query(): SystemIOOutputWorkSheetCopyQuery | undefined {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys
    }
    private get sheet() {
      if (this.query) {
        let json = JSON.parse(this.query.sheet)
        return plainToInstance(IOOutputWorkSheet, json)
      }
      return undefined
    }

    regist() {
      this.html.event.on('ok', this.onok.bind(this))
      this.html.event.on('cancel', this.oncancel.bind(this))
    }

    load() {
      console.log(this.sheet)
      this.business.load().then((x) => {
        this.html.table.load(x, this.sheet?.Id)
      })
    }

    oncancel() {
      this.message.close()
    }
    onok() {
      if (this.sheet) {
        let plain = instanceToPlain(this.sheet)
        let datas = this.html.table.selecteds.map((x) => {
          let data = plainToInstance(IOOutputWorkSheet, plain)
          data.Id = x.Id
          return data
        })
        this.business
          .copy(datas)
          .then((x) => {
            this.message.result({
              result: true,
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({
              result: false,
            })
          })
      }
    }
  }

  const controller = new Controller()
}
