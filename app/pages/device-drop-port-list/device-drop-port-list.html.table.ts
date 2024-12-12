import { EventEmitter } from '../../common/event-emitter'
import { Language } from '../../common/language'
import { LocaleCompare } from '../../common/tools/compare-tool/compare.tool'
import { EnumTool } from '../../common/tools/enum-tool/enum.tool'
import { Sort } from '../../common/tools/html-tool/html-table-sort.tool'
import { HtmlTool } from '../../common/tools/html-tool/html.tool'
import { DeviceDropPortListTableEvent } from './device-drop-port-list.event'
import { DeviceDropPortModel } from './device-drop-port-list.model'

export class DeviceDropPortListHtmlTable {
  event: EventEmitter<DeviceDropPortListTableEvent> = new EventEmitter()
  selecteds: string[] = []
  constructor() {
    this.regist()
    this.init()
  }
  private table = document.getElementById('table') as HTMLTableElement
  private element = {
    thead: {
      checkall: document.getElementById('checkall') as HTMLInputElement,
    },
  }

  private tbody = document.querySelector(
    '#table tbody'
  ) as HTMLTableSectionElement
  private thead = document.querySelector(
    '#table thead'
  ) as HTMLTableSectionElement

  get tablewidth() {
    return this.table.offsetWidth
  }

  private widths = [
    '50px',
    '15%',
    '10%',
    '10%',
    '12%',
    '8%',
    '8%',
    '19%',
    '10%',
    '8%',

    '100px',
  ]
  _sort?: Sort
  datas: DeviceDropPortModel[] = []

  private regist() {
    HtmlTool.table.sort(this.thead, (sort) => {
      this._sort = sort
      this.reload()
    })
  }

  private init() {
    HtmlTool.table.colgroup.append(this.table, this.widths)
  }

  private append(id: number, items: string[]) {
    HtmlTool.table.append(this.tbody, items, [
      {
        inner: `<i class="howell-icon-modification"></i>`,
        id: `modify_${id}`,
        title: '修改',
        click: (args) => {
          let id = args.button.id.replace('modify_', '')
          let data = this.datas.find((x) => x.Id.toString() === id)
          this.event.emit('modify', data)
        },
      },
      {
        inner: `<i class="howell-icon-delete2"></i>`,
        id: `del_${id}`,
        title: 'howell-icon-delete2',
        click: (args) => {
          let id = args.button.id.replace('del_', '')
          let data = this.datas.find((x) => x.Id.toString() === id)
          this.event.emit('delete', data)
        },
      },
    ])
  }

  private sort(sort: Sort) {
    this.datas = this.datas.sort((a: any, b: any) => {
      let _a = a
      let _b = b
      switch (sort.active) {
        case 'ChannelName':
          break
        default:
          break
      }
      return LocaleCompare.compare(
        _a[sort.active],
        _b[sort.active],
        sort.direction === 'asc'
      )
    })
  }

  clear() {
    this.tbody.innerHTML = ''
    this.selecteds = []
  }

  reload() {
    this.clear()
    this.load(this.datas)
  }

  async load(datas: DeviceDropPortModel[]) {
    this.datas = datas
    if (this._sort) {
      this.sort(this._sort)
    }
    for (let i = 0; i < this.datas.length; i++) {
      const item = this.datas[i]
      let channel = await item.channel

      let FullTrashCanPortState = []
      for (let j = 0; j < item.FullTrashCanPortStates.length; j++) {
        let state = await EnumTool.device.TrashCanPortState(
          item.FullTrashCanPortStates[j]
        )

        FullTrashCanPortState.push(state.replace('垃圾桶', ''))
      }

      let values: string[] = [
        HtmlTool.set(item.Id),
        HtmlTool.set(item.Name),
        await EnumTool.trashcan.CanType(item.DropPortType, '-'),
        await EnumTool.device.DropPortState(item.DropPortState, '-'),
        await EnumTool.device.TrashCanPortState(item.TrashCanPortState, '-'),
        await EnumTool.device.IOState(item.DefaultIOState, '-'),
        await EnumTool.device.IOState(item.FullIOState, '-'),
        FullTrashCanPortState.join('，'),
        item.AlarmOutIds ? item.AlarmOutIds.join('，') : '-',
        Language.Enabled(item.AlarmOutEnabled, '-'),
      ]

      this.append(item.Id, values)
    }
  }
}
