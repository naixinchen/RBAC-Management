export interface schoolInfoData {
  _id: string
  schoolname: string
  _v?: number
}

//学校列表
export interface schoolListFormData {
  page: number
  size: number
}

//学校信息接口返回类型
export interface schoolResponseData {
  status: number
  data?: schoolInfoData
  msg?: string
}

export interface schoolAllResponseData {
  status: number
  data?: schoolInfoData[]
  msg?: string
}

export interface schoolListResponseData {
  status: number
  data?: schoolListData
  msg?: string
}
interface schoolListData {
  data: schoolInfoData[]
  total: number
}
