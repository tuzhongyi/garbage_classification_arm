export interface EventMessageData<T = any> {
  command: string
  value?: T
  index: number
}

export enum EventProxyMessageCommand {
  open = 'open',
  close = 'close',
}
