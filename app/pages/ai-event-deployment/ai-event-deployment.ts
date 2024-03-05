import { instanceToPlain, plainToInstance } from 'class-transformer'
import { MessageBar } from '../../common/tools/controls/message-bar/message-bar'
import { EventType } from '../../data-core/enums/event-type.enum'
import { CameraAIEvent } from '../../data-core/models/arm/camera-ai-event.model'
import { TimeSegment } from '../../data-core/models/arm/time-segment.model'
import { AIEventDeploymentBusiness } from './ai-event-deployment.business'
import { AIEventDeploymentCreater as Creater } from './ai-event-deployment.creater'
import { AIEventDeploymentHtmlController } from './ai-event-deployment.html.controller'
import { AIEventDeploymentMessage } from './ai-event-deployment.message'
import { AIEventDeploymentWindow } from './ai-event-deployment.window'

export namespace AIEventDeployment {
  class Controller {
    constructor() {
      this.regist()
    }
    private html = new AIEventDeploymentHtmlController()
    private business = new AIEventDeploymentBusiness()
    private message = new AIEventDeploymentMessage()
    private window = new AIEventDeploymentWindow()
    event?: CameraAIEvent
    week = 0
    isnew = true

    private async load(type: EventType) {
      this.business
        .get(type)
        .then((event) => {
          this.isnew = false
          try {
            this.event = event
            this.html.load(this.event)
            this.html.trigger.load(this.event.EventTrigger)
            this.sheetweekchange(this.week)
          } catch (error) {
            console.error(error)
          }
        })
        .catch((e) => {
          this.isnew = true
          this.event = Creater.CameraAIEvent(type)
        })
    }

    private regist() {
      this.html.event.on('save', () => {
        this.window.confirm.message = '是否保存事件部署信息?'
        this.message.save_confirm(this.window.confirm)
        // this.save()
      })
      this.message.event.on('save', this.save.bind(this))

      this.html.event.on('typechange', this.typechange.bind(this))
      this.html.sheet.event.on('weekchange', this.sheetweekchange.bind(this))
      this.html.sheet.event.on('sheetadd', this.sheetadd.bind(this))
      this.html.sheet.event.on('sheetchange', this.sheetchange.bind(this))
      this.html.sheet.event.on('sheetcopy', this.sheetcopy.bind(this))
    }

    typechange(type: EventType) {
      this.html.sheet.clear()
      this.load(type)
    }
    sheetweekchange(week: number) {
      this.week = week
      this.html.sheet.clear()
      if (this.event) {
        let item = this.event.WorkSheet.Days.find((x) => x.DayOfWeek === week)
        if (item) {
          this.html.sheet.load(item.Segments)
        }
      }
    }
    sheetadd(week: number) {
      if (this.event) {
        let item = this.event.WorkSheet.Days.find((x) => x.DayOfWeek === week)
        if (!item) {
          item = Creater.DayTimeSegment(week)
          this.event.WorkSheet.Days.push(item)
        }

        let time = Creater.TimeSegment()
        if (!item.Segments) {
          item.Segments = []
        }
        item.Segments.push(time)
        this.html.sheet.clear()
        this.html.sheet.load(item.Segments)
      }
    }
    sheetchange(datas: TimeSegment[]) {
      if (this.event) {
        let day = this.event.WorkSheet.Days.find(
          (x) => x.DayOfWeek === this.week
        )
        if (day) {
          day.Segments = datas
        }
      }
    }
    sheetcopy(weeks: number[]) {
      if (this.event) {
        let current = this.event.WorkSheet.Days.find(
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

            let index = this.event.WorkSheet.Days.findIndex(
              (x) => x.DayOfWeek === weeks[i]
            )
            if (index >= 0) {
              this.event.WorkSheet.Days[index] = day
            } else {
              this.event.WorkSheet.Days.push(day)
            }
          }
          MessageBar.success('复制成功')
        }
      }
    }

    private save() {
      if (this.event) {
        this.event.Name = this.html.property.Name.get()
        let promise: Promise<CameraAIEvent>
        if (this.isnew) {
          promise = this.business.create(this.event)
        } else {
          promise = this.business.update(this.event)
        }

        promise
          .then((x) => {
            MessageBar.success('保存成功')
            this.load(x.Type)
          })
          .catch((e) => {
            MessageBar.error('保存失败')
          })
      }
    }
  }

  const controller = new Controller()
}
