export interface majorInfoData {
  _id: string
  majorname: string
  _v?: number
}

//专业列表
export interface majorListFormData {
  page: number
  size: number
}

//专业信息接口返回类型
export interface majorResponseData {
  status: number
  data?: majorInfoData
  msg?: string
}

export interface majorAllResponseData {
  status: number
  data?: majorInfoData[]
  msg?: string
}

export interface majorListResponseData {
  status: number
  data?: majorListData
  msg?: string
}
interface majorListData {
  data: majorInfoData[]
  total: number
}
