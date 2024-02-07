import { IIdNameModel } from '../../../../data-core/models/model.interface'
import { EventEmitter } from '../../../event-emitter'
import { MultiSelectControlEvent } from './multi-select-control.event'
import './multi-select-control.less'
export class MultiSelectControl {
  constructor(private parent: HTMLDivElement) {
    parent.classList.add('multi-select-control')
    this.init()
    this.regist()
  }

  event: EventEmitter<MultiSelectControlEvent> = new EventEmitter()

  private element = {
    selection: document.createElement('div'),
    items: document.createElement('div'),
  }

  get parentElement() {
    return this.parent.parentElement
  }

  get show() {
    return this.element.items.classList.contains('show')
  }
  set show(value: boolean) {
    if (this.show === value) {
      return
    }
    if (value) {
      this.element.items.classList.add('show')
    } else {
      this.element.items.classList.remove('show')
    }
  }

  private selecteds: Map<string, IIdNameModel> = new Map()
  private items: IIdNameModel[] = []

  private init() {
    this.element.selection.classList.add('multi-select-control-selections')
    this.element.items.classList.add('multi-select-control-items')
    this.parent.appendChild(this.element.selection)
    this.parent.appendChild(this.element.items)
  }
  private regist() {
    this.element.selection.addEventListener('click', (e) => {
      e.stopImmediatePropagation()
      this.show = !this.show
    })
    window.addEventListener('click', () => {
      this.show = false
    })
  }

  appendSelection(model: IIdNameModel) {
    let item = document.createElement('div')
    item.id = this.setSelectionId(model.Id)
    item.classList.add('multi-select-control-selection')
    item.title = model.Name
    item.innerHTML = model.Name

    this.element.selection.appendChild(item)
  }
  appendItem(model: IIdNameModel) {
    let item = document.createElement('div')
    item.id = this.setItemId(model.Id)
    item.addEventListener('click', (e) => {
      this.onitemclick(e)
    })
    item.classList.add('multi-select-control-item')

    let check = document.createElement('div')
    let _checkbox = document.createElement('input')
    _checkbox.type = 'checkbox'
    check.appendChild(_checkbox)
    item.appendChild(check)

    let label = document.createElement('div')
    label.innerText = model.Name
    item.appendChild(label)

    this.element.items.appendChild(item)
  }

  private setItemId(id: string) {
    return `msc_item_${id}`
  }
  private setSelectionId(id: string) {
    return `msc_selection_${id}`
  }
  private getId(id: string) {
    let _id = id.split('_')
    return _id[_id.length - 1]
  }

  onitemclick(e: MouseEvent) {
    e.stopImmediatePropagation()
    let div = e.target as HTMLDivElement
    let checkbox = div.querySelector('input') as HTMLInputElement
    checkbox.checked = !checkbox.checked
    let id = this.getId(div.id)
    if (checkbox.checked) {
      if (!this.selecteds.has(id)) {
        let item = this.items.find((x) => x.Id == id)
        if (item) {
          this.selecteds.set(id, item)
        }
      }
    } else {
      if (this.selecteds.has(id)) {
        this.selecteds.delete(id)
      }
    }
    this.loadSelection()
  }

  private loadSelection() {
    this.element.selection.innerHTML = ''
    this.selecteds.forEach((value) => {
      this.appendSelection(value)
    })
    this.event.emit('select', Array.from(this.selecteds.values()))
  }

  clear() {
    this.items = []
    this.selecteds.clear()
    this.element.items.innerHTML = ''
    this.element.selection.innerHTML = ''
  }

  load(datas: IIdNameModel[]) {
    this.items = datas
    for (let i = 0; i < datas.length; i++) {
      this.appendItem(datas[i])
    }
  }

  select(items: IIdNameModel[]) {
    this.selecteds.clear()
    for (let i = 0; i < items.length; i++) {
      let item = this.items.find((x) => x.Id == items[i].Id)
      if (item) {
        let id = this.setItemId(item.Id)
        let div = document.getElementById(id) as HTMLDivElement
        if (div) {
          let checkbox = div.querySelector('input') as HTMLInputElement
          checkbox.checked = true
          this.selecteds.set(item.Id, item)
        }
      }
    }
    this.loadSelection()
  }
}
