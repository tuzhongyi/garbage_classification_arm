import { IWindowQuery, WindowModel } from '../window/window.model'

export class ConfirmWindowModel<
  T extends IWindowQuery = {}
> extends WindowModel<T> {
  title: string = '提示'
  message: string = '确定要删除吗？'
}
