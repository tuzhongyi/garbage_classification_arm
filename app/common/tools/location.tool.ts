export class LocationTool {
  static querys(url: string) {
    let index = url.indexOf('?')
    let search = url.substring(index + 1)
    let result: any = {}
    let keyValues = search.split('&')
    for (let i = 0; i < keyValues.length; i++) {
      let keyValue = keyValues[i].split('=')
      let key = keyValue[0]
      let value = keyValue[1]
      result[key] = decodeURIComponent(value)
    }
    return result
  }
}
