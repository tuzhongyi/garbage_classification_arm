import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { LocalStorageService } from '../../../common/local-storage/local-storage.service'
import { IDigestSession } from '../../../common/local-storage/session.storage'
import { DigestWindow } from './auth.model'
import { Digest } from './digest'

export class HowellAuthHttp {
  private nc = 1

  constructor() {}

  getHtml(path: string) {
    return axios(path, {
      method: 'get',
      url: path,
      responseType: 'text',
    })
  }

  get<R>(path: string) {
    const myHeaders = this.getHttpHeaders('GET', path)
    const httpOptions = {
      headers: myHeaders,
    }
    return axios.get(path, httpOptions).then((res) => {
      if (res.status === 200) {
        return res.data as R
      }
      throw new Error(res.statusText)
    })
  }
  post<R>(path: string): Promise<R>
  post<T>(path: string, data?: T): Promise<T>
  post<T, R>(path: string, data?: T): Promise<R>
  post<R, T = any>(path: string, data?: T, config?: AxiosRequestConfig) {
    const myHeaders = this.getHttpHeaders('POST', path, config)
    const httpOptions = {
      headers: myHeaders,
    }
    return axios
      .post<T, AxiosResponse<R>>(path, data, httpOptions)
      .then((res) => {
        if (res.status === 200) {
          return res.data as R
        }
        throw new Error(res.statusText)
      })
  }
  put<R>(path: string): Promise<R>
  put<T>(path: string, data?: T): Promise<T>
  put<T, R>(path: string, data?: T): Promise<R>
  put<R, T = any>(path: string, data?: T, config?: AxiosRequestConfig) {
    const myHeaders = this.getHttpHeaders('PUT', path, config)
    const httpOptions = {
      headers: myHeaders,
    }
    return axios.put<T, R>(path, data, httpOptions)
  }
  delete<R>(path: string, config?: AxiosRequestConfig) {
    const myHeaders = this.getHttpHeaders('DELETE', path, config)
    const httpOptions = {
      headers: myHeaders,
    }

    return axios.delete(path, httpOptions).then((res) => {
      if (res.status === 200) {
        return res.data as R
      }
      throw new Error(res.statusText)
    })
  }

  auth(username: string, passowrd: string, path: string) {
    const httpOptions = {
      headers: { 'X-WebBrowser-Authentication': 'Forbidden' },
    }
    return new Promise((resolve, reject) => {
      axios.get(path, httpOptions).catch((error) => {
        if (error.response.status == 403) {
          let digest = window as DigestWindow
          digest.digest = new Digest(error.response.headers, path)
          LocalStorageService.sign.save({
            username: username,
            password: passowrd,
          })
          this.get(path)
            .then((x) => {
              resolve(x)
            })
            .catch((x) => {
              LocalStorageService.sign.clear()
              reject(x)
            })
        }
      })
    })
  }
  clear() {
    LocalStorageService.sign.clear()
    let digestWindow = window as DigestWindow
    digestWindow.digest = undefined
  }
  //获取已授权的头部
  getHttpHeaders(method: string, uri: string, config?: AxiosRequestConfig) {
    let digistWindow = window as DigestWindow
    let sign = LocalStorageService.sign.get()
    if (digistWindow.digest && sign) {
      let challenge =
        digistWindow.digest.parseServerChallenge() as IDigestSession

      this.nc += 1
      // 123456
      let result = digistWindow.digest.generateRequestHeader(
        this.nc.toString(),
        challenge,
        sign.username,
        sign.password,
        method,
        uri
      )
      if (config) {
        result = Object.assign(result, config)
      }
      return result
    }
  }
}
