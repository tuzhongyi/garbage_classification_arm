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

  get<R>(path: string, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      const myHeaders = this.getHttpHeaders('GET', path, config)
      const httpOptions = myHeaders
        ? {
            headers: myHeaders,
          }
        : config
      axios
        .get(path, httpOptions)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }

  post<R>(path: string): Promise<R>
  post<T>(path: string, data?: T): Promise<T>
  post<T, R>(path: string, data?: T): Promise<R>
  post<R, T>(path: string, data?: T, config?: AxiosRequestConfig): Promise<R>
  post<R, T = any>(path: string, data?: T, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      const myHeaders = this.getHttpHeaders('POST', path, config)
      const httpOptions = myHeaders
        ? {
            headers: myHeaders,
          }
        : config
      axios
        .post<T, AxiosResponse<R>>(path, data, httpOptions)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  put<R>(path: string): Promise<R>
  put<T>(path: string, data?: T): Promise<T>
  put<T, R>(path: string, data?: T): Promise<R>
  put<R, T = any>(path: string, data?: T, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      const myHeaders = this.getHttpHeaders('PUT', path, config)
      const httpOptions = {
        headers: myHeaders,
      }
      axios
        .put<T, AxiosResponse<R>>(path, data, httpOptions)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  delete<R>(path: string, config?: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      const myHeaders = this.getHttpHeaders('DELETE', path, config)
      const httpOptions = {
        headers: myHeaders,
      }

      return axios
        .delete(path, httpOptions)
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
        .catch((e) => {
          reject(e)
        })
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
          LocalStorageService.login.save({
            username: username,
            password: passowrd,
          })
          this.get(path)
            .then((x) => {
              resolve(x)
            })
            .catch((x) => {
              LocalStorageService.login.clear()
              reject(x)
            })
        }
      })
    })
  }
  clear() {
    LocalStorageService.login.clear()
    let digestWindow = window as DigestWindow
    digestWindow.digest = undefined
  }
  //获取已授权的头部
  getHttpHeaders(method: string, uri: string, config?: AxiosRequestConfig) {
    return undefined
    let digistWindow = window as DigestWindow
    let sign = LocalStorageService.login.get()
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
