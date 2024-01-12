import { FileResult } from './upload-control.model'

export interface UploadControlEventArgs {
  upload: (args: FileResult) => void
}
