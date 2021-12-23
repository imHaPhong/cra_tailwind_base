import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import LocalStorage from 'src/constants/local-storage';

class Http {

  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API,
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.response.use(response => {
      const result = {...response.data, status: response.status}
      return result
    }, ({response}) => {
      const result = { ...response.data ,status: response.status}
      return Promise.reject({...result})
    })

    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
       }
      const accessToken = localStorage.getItem(LocalStorage.accessToken);
      console.log(accessToken)
      if(accessToken) {
        config.headers.authorization = accessToken;
      }
      console.log(config)
      return config
    }, (error) => {
      console.log(error)

      return Promise.reject(error.response)
    })
  }

  get(url : string, config = {}) {
    return this.instance.get(url, config)
  }

  post(url : string, data?: any, config = {}) {
    return this.instance.post(url, data, config)
  }

  put(url : string, data: any, config = {}) {
    return this.instance.put(url, data, config)
  }

  delete(url : string,data : any, config = {}) {
    return this.instance.delete(url, {
      data,
      ...config
    })
  }
}

const http = new Http()
export default http