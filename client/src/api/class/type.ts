export interface classInfoData {
  _id: string
  classname: string
  _v?: number
  teacher_id: string
  manager_id: string
}

//班级列表
export interface classListFormData {
  page: number
  size: number
  searchMap: searchMapData
}
interface searchMapData {
  teacher_id?: string
  manager_id?: string
}

//班级信息接口返回类型
export interface classResponseData {
  status: number
  data?: classInfoData
  msg?: string
}

export interface classAllResponseData {
  status: number
  data?: classInfoData[]
  msg?: string
}

export interface classListResponseData {
  status: number
  data?: classListData
  msg?: string
}
interface classListData {
  data: classInfoData[]
  total: number
}
