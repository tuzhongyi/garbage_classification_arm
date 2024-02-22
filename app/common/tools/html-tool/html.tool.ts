import { HtmlElementTool } from './html-element.tool'
import { HTMLInputElementTool } from './html-input.tool'
import { HTMLSelectElementTool } from './html-select.tool'
import { HTMLTableElementTool } from './html-table.tool'

export class HtmlTool {
  static element = new HtmlElementTool()
  static select = new HTMLSelectElementTool()
  static input = new HTMLInputElementTool()
  static table = new HTMLTableElementTool()

  static get(value: string): string | undefined
  static get(value: string, isnumber: boolean): number | undefined
  static get(value: string, isnumber: boolean = false) {
    if (isnumber) {
      return parseInt(value)
    }
    if (value) {
      return value.trim()
    }
    return undefined
  }

  static set(value?: string | number | boolean): string {
    if (value == undefined || value == null) {
      return ''
    } else if (typeof value === 'number') {
      return value.toString()
    } else if (typeof value === 'boolean') {
      return JSON.stringify(value)
    } else {
      return value
    }
  }
}
