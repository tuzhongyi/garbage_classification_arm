import { IIdNameModel } from '../../../data-core/models/model.interface'

export class HTMLSelectElementTool {
  append(model: IIdNameModel, parent: HTMLSelectElement) {
    let option = document.createElement('option')
    option.innerHTML = model.Name
    option.value = model.Id
    parent.appendChild(option)
  }
}
