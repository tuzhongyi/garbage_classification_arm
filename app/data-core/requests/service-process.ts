import { ClassConstructor, plainToInstance } from 'class-transformer'
import { HowellResponse } from '../models/response'

export class HowellResponseProcess {
  static array<T>(response: HowellResponse<T[]>, cls: ClassConstructor<T>) {
    if (response.FaultCode === 0) {
      return plainToInstance(cls, response.Data)
    }
    throw new Error(`${response.FaultCode}:${response.FaultReason}`)
  }
  static get<T>(response: HowellResponse<T>, cls: ClassConstructor<T>) {
    if (response.FaultCode === 0) {
      return plainToInstance(cls, response.Data)
    }
    throw new Error(`${response.FaultCode}:${response.FaultReason}`)
  }
  static put<T>(response: HowellResponse<T>, cls: ClassConstructor<T>) {
    if (response.FaultCode === 0) {
      return plainToInstance(cls, response.Data)
    }
    throw new Error(`${response.FaultCode}:${response.FaultReason}`)
  }
  static delete<T>(response: HowellResponse<T>, cls: ClassConstructor<T>) {
    if (response.FaultCode === 0) {
      return plainToInstance(cls, response.Data)
    }
    throw new Error(`${response.FaultCode}:${response.FaultReason}`)
  }
  static post<T>(response: HowellResponse<T>, cls: ClassConstructor<T>) {
    if (response.FaultCode === 0) {
      return plainToInstance(cls, response.Data)
    }
    throw new Error(`${response.FaultCode}:${response.FaultReason}`)
  }
}
