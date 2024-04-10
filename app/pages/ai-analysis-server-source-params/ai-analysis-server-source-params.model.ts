import { IPictureWindowQuery } from '../window-picture/window-picture.model'

export interface IasParamsWindowQuery extends IPictureWindowQuery {
  serverId: string
  sourceId: string
}
