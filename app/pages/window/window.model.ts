export class WindowModel<T extends IWindowQuery> {
  query: T = {} as T

  style: any = {}
  url = ''
}

export interface IWindowQuery {
  [key: string]: any
}
