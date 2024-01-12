import { UploadControl } from '../../common/tools/upload-control/upload-control'
import './system-maintain-config.less'

export class SystemMaintainConfigHtmlController {
  constructor() {
    this.regist()
  }

  private parser = new DOMParser()

  element = {
    power: {},
    reset: {},
    config: {
      upload: new UploadControl(
        document.getElementById('config_input_text') as HTMLInputElement,
        document.getElementById('config_input_button') as HTMLInputElement,
        document.getElementById('config_input_file') as HTMLInputElement
      ),
    },
    upgrade: {
      upload: new UploadControl(
        document.getElementById('upgrade_text') as HTMLInputElement,
        document.getElementById('upgrade_button') as HTMLInputElement,
        document.getElementById('upgrade_file') as HTMLInputElement
      ),
    },
  }

  regist() {}
}
