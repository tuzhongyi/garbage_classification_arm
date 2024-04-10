import { LocationTool } from '../../common/tools/location.tool'
import { Polygon } from '../../data-core/models/arm/polygon.model'
import { AIAnalysisServerSourceParamsBusiness } from './ai-analysis-server-source-params.business'
import { AIAnalysisServerSourceParamsMessage } from './ai-analysis-server-source-params.message'
import { IasParamsWindowQuery } from './ai-analysis-server-source-params.model'
import { AIAnalysisServerSourceParamsHtmlController } from './controller/ai-analysis-server-source-params.html.controller'

export namespace AIAnalysisServerSourceParams {
  class Controller {
    constructor() {
      this.init()
      this.regist()
    }
    private html = new AIAnalysisServerSourceParamsHtmlController()
    private business = new AIAnalysisServerSourceParamsBusiness()
    private message = new AIAnalysisServerSourceParamsMessage()

    init() {
      if (this.query) {
        this.html.load(this.query)
      }
    }

    regist() {
      this.html.event.on('close', this.onclose.bind(this))
      this.html.event.on('ok', this.onok.bind(this))
      this.html.canvas.event.on('inited', () => {
        this.load()
      })
      this.html.canvas.event.on('polygon', (polygon) => {
        this.html.canvas.load(polygon)
      })
    }

    async load() {
      if (this.query) {
        this.business.load(this.query).then((x) => {
          this.html.canvas.load(x)
        })
      }
    }

    check(data: Polygon) {
      if (!data.Coordinates || data.Coordinates.length == 0) {
        this.message.result({
          inner: true,
          result: false,
          message: '请绘制区域',
        })
        return false
      }

      return true
    }

    onok() {
      let data = this.html.canvas.get()
      if (this.query && this.check(data)) {
        this.business
          .set(this.query, data)
          .then((x) => {
            this.message.result({
              inner: true,
              result: true,
              message: '操作成功',
            })
            this.message.close()
          })
          .catch((e) => {
            this.message.result({
              inner: true,
              result: false,
              message: '操作失败',
            })
          })
      }
    }

    onclose() {
      this.message.close()
    }

    get query(): IasParamsWindowQuery | undefined {
      if (location.search.length === 0) return undefined
      let querys = LocationTool.query.decode(location.search)
      return querys
    }
  }

  const controller = new Controller()
}
