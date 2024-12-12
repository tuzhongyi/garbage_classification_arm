import { EnumTool } from '../../../../common/tools/enum-tool/enum.tool'
import { CanType } from '../../../../data-core/enums/robot/robot-can-type.model'
import { RobotTrashCan } from '../../../../data-core/models/robot/robot-trash-can.model'

export class DeviceRobotPlayHtmlTrashCansController {
  private element = {
    trashcans: document.querySelector('.trashcans') as HTMLDivElement,
    images: {
      Dry: document.getElementById('img_Dry') as HTMLImageElement,
      Wet: document.getElementById('img_Wet') as HTMLImageElement,
      Recycle: document.getElementById('img_Recycle') as HTMLImageElement,
      Hazard: document.getElementById('img_Hazard') as HTMLImageElement,
    },
  }

  private async append(trashcan: RobotTrashCan) {
    let div = document.createElement('div')
    div.classList.add('trashcan')
    let title = `类型：${await EnumTool.trashcan.CanType(trashcan.CanType)}`
    if (trashcan.Volume != undefined) {
      title += '\n容量：' + trashcan.Volume
    }
    if (trashcan.CoverState) {
      title += `\n桶盖：${await EnumTool.trashcan.CoverState(
        trashcan.CoverState
      )}`
    }
    if (trashcan.Confidence) {
      title += `\n置信度：${trashcan.Confidence}`
    }
    if (trashcan.SourceFrom) {
      title += `\n数据来源：${trashcan.SourceFrom}`
    }
    div.setAttribute('data-title', title)
    let images = this.element.images as { [key: string]: HTMLImageElement }
    div.style.backgroundImage = `url(${images[trashcan.CanType].src})`
    this.element.trashcans.appendChild(div)
  }

  private getSortNumber(type: CanType) {
    switch (type) {
      case CanType.Dry:
        return 1
      case CanType.Wet:
        return 2
      case CanType.Recycle:
        return 3
      case CanType.Hazard:
        return 4
      default:
        return 0
    }
  }

  clear() {
    this.element.trashcans.innerHTML = ''
  }

  async load(datas: RobotTrashCan[]) {
    this.clear()
    let trashcans = datas.filter((x) => !x.Position)
    trashcans = trashcans.sort((a, b) => {
      let _a = this.getSortNumber(a.CanType)
      let _b = this.getSortNumber(b.CanType)
      return _a - _b
    })
    for (let i = 0; i < trashcans.length; i++) {
      await this.append(trashcans[i])
    }
  }
}
