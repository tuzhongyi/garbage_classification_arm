import { instanceToPlain, plainToInstance } from 'class-transformer'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { IOState } from '../../data-core/enums/io/io-state.enum'
import { IOOutputPort } from '../../data-core/models/arm/io/io-output-port.model'
import { IOOutputWorkSheet } from '../../data-core/models/arm/io/io-output-work-sheet.model'
import { TimeSegment } from '../../data-core/models/arm/time-segment.model'
import { SystemIOOutputBusiness } from './system-io-output.business'
import { SystemIOOutputCreater as Creater } from './system-io-output.creater'
import { SystemIOOutputHtmlController } from './system-io-output.html.controller'
import { SystemIOOutputMessage } from './system-io-output.message'
import { SystemIOOutputWindow } from './system-io-output.window'

export namespace SystemIOOutput {
  class WorkSheetController {
    constructor(
      private html: SystemIOOutputHtmlController,
      private business: SystemIOOutputBusiness
    ) {
      this.regist()
    }

    private week = 0
    private sheet?: IOOutputWorkSheet

    get() {
      if (this.sheet) {
        return this.sheet
      }
      throw new Error('sheet is null')
    }

    private regist() {
      this.html.event.on('select', this.onselect.bind(this))
      this.html.sheet.event.on('enabled', this.onenabled.bind(this))
      this.html.sheet.event.on('state', this.onstate.bind(this))
      this.html.sheet.event.on('week', this.onweek.bind(this))
      this.html.sheet.event.on('add', this.onadd.bind(this))
      this.html.sheet.event.on('change', this.onchange.bind(this))
      this.html.sheet.event.on('copy', this.oncopy.bind(this))
    }

    load(source: IOOutputPort) {
      let promise = new Promise<IOOutputWorkSheet>((resolve) => {
        this.business.sheet
          .get(source.Id)
          .then((x) => {
            if (!x.WorkSheet) {
              x.WorkSheet = Creater.WorkSheet()
            }
            resolve(x)
          })
          .catch((x) => {
            resolve(Creater.IOOutputWorkSheet(source))
          })
      })
      promise.then((x) => {
        this.sheet = x
        let day = this.sheet.WorkSheet?.Days.find(
          (x) => x.DayOfWeek === this.week
        )
        this.html.sheet.clear()
        this.html.sheet.load(
          this.sheet.Enabled,
          this.sheet.State,
          day?.Segments
        )
      })
    }

    private onenabled(value: boolean) {
      if (this.sheet) {
        this.sheet.Enabled = value
      }
    }
    private onstate(state: IOState) {
      if (this.sheet) {
        this.sheet.State = state
      }
    }

    private onselect(data: IOOutputPort) {
      this.html.sheet.clear()
      this.load(data)
    }

    private onweek(week: number) {
      this.week = week
      this.html.sheet.clear()
      if (this.sheet) {
        if (!this.sheet.WorkSheet) {
          this.sheet.WorkSheet = Creater.WorkSheet()
        }

        let item = this.sheet.WorkSheet.Days.find((x) => x.DayOfWeek === week)
        if (item) {
          this.html.sheet.load(
            this.sheet.Enabled,
            this.sheet.State,
            item.Segments
          )
        }
      }
    }
    private onadd(week: number) {
      if (this.sheet) {
        if (!this.sheet.WorkSheet) {
          this.sheet.WorkSheet = Creater.WorkSheet()
        }
        let item = this.sheet.WorkSheet.Days.find((x) => x.DayOfWeek === week)
        if (!item) {
          item = Creater.DayTimeSegment(week)
          this.sheet.WorkSheet.Days.push(item)
        }

        let time = Creater.TimeSegment()
        if (!item.Segments) {
          item.Segments = []
        }
        item.Segments.push(time)
        this.html.sheet.clear()
        this.html.sheet.load(
          this.sheet.Enabled,
          this.sheet.State,
          item.Segments
        )
      }
    }
    private onchange(datas: TimeSegment[]) {
      if (this.sheet) {
        if (!this.sheet.WorkSheet) {
          this.sheet.WorkSheet = Creater.WorkSheet()
        }
        let day = this.sheet.WorkSheet.Days.find(
          (x) => x.DayOfWeek === this.week
        )
        if (day) {
          day.Segments = datas
        }
      }
    }
    private oncopy(weeks: number[]) {
      if (this.sheet) {
        if (!this.sheet.WorkSheet) {
          this.sheet.WorkSheet = Creater.WorkSheet()
        }
        let current = this.sheet.WorkSheet.Days.find(
          (x) => x.DayOfWeek === this.week
        )
        if (current) {
          for (let i = 0; i < weeks.length; i++) {
            let day = Creater.DayTimeSegment(weeks[i])

            let plain = instanceToPlain(current.Segments)
            day.Segments = plainToInstance(
              TimeSegment,
              plain
            ) as unknown as TimeSegment[]

            let index = this.sheet.WorkSheet.Days.findIndex(
              (x) => x.DayOfWeek === weeks[i]
            )
            if (index >= 0) {
              this.sheet.WorkSheet.Days[index] = day
            } else {
              this.sheet.WorkSheet.Days.push(day)
            }
          }
          MessageBar.success('复制成功')
        }
      }
    }
  }

  class PortController {
    constructor(
      private html: SystemIOOutputHtmlController,
      private business: SystemIOOutputBusiness
    ) {
      this.regist()
      this.init()
    }

    clear() {
      this.html.clear()
    }

    async init() {
      let datas = await this.business.load()
      this.html.init(datas)
    }

    load(data: IOOutputPort) {
      this.html.load(data)
    }

    private regist() {
      this.html.event.on('select', this.onselect.bind(this))
    }

    private onselect(data: IOOutputPort) {
      this.load(data)
    }
  }

  class Controller {
    private html = new SystemIOOutputHtmlController()
    private business = new SystemIOOutputBusiness()
    private message = new SystemIOOutputMessage()
    private window = new SystemIOOutputWindow()
    constructor() {
      this.regist()
    }

    private port = new PortController(this.html, this.business)
    private sheet = new WorkSheetController(this.html, this.business)

    regist() {
      this.html.event.on('save', this.onsave.bind(this))
      this.message.event.on('save', this.tosave.bind(this))

      this.html.event.on('manual', this.onmanual.bind(this))
      this.message.event.on('manual', this.tomanual.bind(this))

      this.html.event.on('copy', this.oncopy.bind(this))
      this.message.event.on('copy', this.oncopied.bind(this))
    }

    onsave(data: IOOutputPort) {
      this.window.confirm.message = '是否保存事件部署信息?'
      this.window.confirm.data = {
        port: data,
        sheet: this.sheet.get(),
      }
      this.message.save_confirm(this.window.confirm)
    }

    tosave() {
      if (this.window.confirm.data) {
        let update = this.business.update(this.window.confirm.data.port)
        let sheet = this.business.sheet.set(this.window.confirm.data.sheet)
        let promsie = [update, sheet]
        Promise.all(promsie)
          .then(() => {
            MessageBar.success('保存成功')
          })
          .catch(() => {
            MessageBar.error('保存失败')
          })
          .finally(() => {
            this.window.confirm.clear()
          })
      }
    }

    onmanual(data: IOOutputPort) {
      let sheet = this.sheet.get()
      this.window.confirm.data = {
        port: data,
        sheet: this.sheet.get(),
      }
      if (sheet.Enabled) {
        this.window.confirm.message = '是否停止工作表，改为手动操作?'
        this.message.manual_confirm(this.window.confirm)
      } else {
        this.tomanual(false)
      }
    }

    private async tomanual(stop: boolean = true) {
      if (this.window.confirm.data) {
        if (stop) {
          this.window.confirm.data.sheet.Enabled = false
          let sheet = await this.business.sheet.set(
            this.window.confirm.data.sheet
          )
          this.sheet.load(this.window.confirm.data.port)
        }

        let state =
          this.window.confirm.data.port.State === IOState.Low
            ? IOState.High
            : IOState.Low
        this.business
          .state(this.window.confirm.data.port.Id, state)
          .then((x) => {
            MessageBar.success('设置成功')
            this.port.load(x)
          })
          .catch(() => {
            MessageBar.error('设置失败')
          })
          .finally(() => {
            this.window.confirm.clear()
          })
      }
    }

    private oncopy() {
      let sheet = this.sheet.get()
      this.business.sheet.set(sheet).then((x) => {
        this.window.copy.query = {
          sheet: JSON.stringify(sheet),
        }
        this.message.copy_open(this.window.copy)
      })
    }

    private oncopied(result: boolean) {
      if (result) {
        MessageBar.success('复制成功')
        this.port.clear()
        this.port.init()
      } else {
        MessageBar.error('复制失败')
      }
    }
  }

  const controller = new Controller()
}
