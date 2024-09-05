import { instanceToPlain, plainToInstance } from 'class-transformer'
import { Authentication } from '../../../../models/arm/authentication.model'
import { SecurityCapability } from '../../../../models/capabilities/arm/cecurity-capability.model'
import { HowellResponse } from '../../../../models/response'
import { ArmSystemUrl } from '../../../../urls/arm/system/system.url'
import { HowellAuthHttp } from '../../../auth/howell-auth-http'
import { HowellResponseProcess } from '../../../service-process'

export class SystemSecurityRequestService {
  constructor(private http: HowellAuthHttp) {}
  async capability() {
    let url = ArmSystemUrl.security.capability()
    return this.http
      .get<HowellResponse<SecurityCapability>>(url)
      .then((response) => {
        return HowellResponseProcess.item(response, SecurityCapability)
      })
  }
  authentication = {
    get: () => {
      let url = ArmSystemUrl.security.authentication()
      return this.http.get<HowellResponse<Authentication>>(url)
    },
    update: async (data: Authentication) => {
      let plain = instanceToPlain(data)
      let url = ArmSystemUrl.security.authentication()
      let response = await this.http.put<any, HowellResponse<Authentication>>(
        url,
        plain
      )
      return plainToInstance(Authentication, response.Data)
    },
  }
}
