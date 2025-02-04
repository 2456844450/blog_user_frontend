import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message } from "element-ui"


export interface ResponseData {
  code: number;
  data?: any;
  message: string
}

let service: AxiosInstance | any;
if (process.env.NODE_ENV === 'development') {
  service = axios.create({
    baseURL: "/api",
    timeout: 50000
  })
}else {

  service = axios.create({
    baseURL: "/api",
    timeout: 50000
  })
}

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: any) => {
    console.error("error:", error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      const data: ResponseData = res.data
      if (data.code === 0) {
        return data.data
      }else {
        Message({
          message: data.message,
          type: 'error'
        })
      }
    } else {
      Message({
        message: '网络错误!',
        type: 'error'
      })
      return Promise.reject(new Error(res.data.message || 'Error'))
    }
  },
  (error: any) => Promise.reject(error)
)

export default service