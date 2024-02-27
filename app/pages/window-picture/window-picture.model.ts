import { IWindowQuery, WindowModel } from '../window/window.model'

export interface IPictureWindowQuery extends IWindowQuery {
  title: string
  img: string
}

export class PictureWindowModel extends WindowModel<IPictureWindowQuery> {}
