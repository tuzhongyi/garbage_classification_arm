import { ICapability } from '../../../data-core/models/capabilities/capability.interface'

export class EnumToolHelper {
  static get<T extends string | number>(
    capability: Promise<ICapability>,
    key: string,
    value?: T,
    def = '',
    language?: string
  ): Promise<string> {
    return new Promise<string>((resolve) => {
      capability
        .then((_capability) => {
          if (_capability[key]) {
            let _enum = (_capability[key] as Array<any>).find(
              (x) => x.Value == value
            )
            if (_enum) {
              resolve(_enum.Name)
              return
            }
          }
          if (language) {
            resolve(language)
          } else {
            resolve(value ? `${value}` : def)
          }
        })
        .catch((x) => {
          if (language) {
            resolve(language)
          } else {
            resolve(value ? `${value}` : def)
          }
        })
    })
  }
}
