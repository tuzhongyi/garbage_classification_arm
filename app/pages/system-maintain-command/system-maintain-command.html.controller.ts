import { EventEmitter } from '../../common/event-emitter'
import { SystemMaintainCommandEvent } from './system-maintain-command.event'
import './system-maintain-command.less'
export class SystemMaintainCommandHtmlController {
  event = new EventEmitter<SystemMaintainCommandEvent>()
  constructor() {
    this.regist()
  }

  private element = {
    content: document.getElementById('content') as HTMLTextAreaElement,
    command: document.getElementById('command') as HTMLInputElement,
    send: document.getElementById('send') as HTMLButtonElement,
  }

  private regist() {
    this.element.send.addEventListener('click', () => {
      this.send()
    })
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.send()
      }
    })
  }

  send() {
    let value = this.element.command.value.trim()
    this.event.emit('command', value)
  }

  clear() {
    this.element.content.innerHTML = ''
  }

  load(data: string) {
    console.log(data)
    // data = data.replace(/ /g, '&ensp;')
    // data = data.replace(/\n/g, '<br />')
    // this.element.content.innerHTML = data
    this.element.content.value = data
  }
}
