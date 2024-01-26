import { WindowModel } from '../window/window.model'

export class ConfirmWindowModel extends WindowModel {
  title: string = '提示'
  message: string = '确定要删除吗？'
}
