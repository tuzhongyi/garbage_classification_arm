import { TransformationType, TransformFnParams } from 'class-transformer'
import { Time } from './common/time.model'

export function transformDateTime(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value)
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    let date = params.value as Date
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}.${date.getMilliseconds()}${
      date.getTimezoneOffset() < 0 ? '+' : '-'
    }${Math.abs(date.getTimezoneOffset() / 60)
      .toString()
      .padStart(2, '0')}:${Math.abs(date.getTimezoneOffset() % 60)
      .toString()
      .padStart(2, '0')}`
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value)
  }
}

export function transformDate(params: TransformFnParams) {
  if (params.type === TransformationType.PLAIN_TO_CLASS) {
    return new Date(params.value)
  } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
    let date = params.value as Date
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  } else if (params.type === TransformationType.CLASS_TO_CLASS) {
    return new Date(params.value)
  }
}

export function transformTime(params: TransformFnParams) {
  if (Array.isArray(params.value)) {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return params.value.map((x) => new Time(x))
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      return params.value.map((x: Time) => {
        let value = x as Time
        return `${value.hour}:${value.minute}:${value.second}`
      })
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return params.value.map((x) => new Time(x))
    }
  } else {
    if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return new Time(params.value)
    } else if (params.type === TransformationType.CLASS_TO_PLAIN) {
      let value = params.value as Time
      return `${value.hour}:${value.minute}:${value.second}`
    } else if (params.type === TransformationType.CLASS_TO_CLASS) {
      return new Time(params.value)
    }
  }
  return params.value
}
