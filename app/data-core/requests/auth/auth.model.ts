import { Digest } from './digest'
import { HowellAuthHttp } from './howell-auth-http'

export class DigestWindow extends Window {
  digest?: Digest
  http?: HowellAuthHttp
}
