import request from '@/utils/request'
import type {
  majorInfoData,
  majorListFormData,
  majorAllResponseData,
  majorListResponseData,
  majorResponseData,
} from './type'

enum API {
  MAJOR_ALL_URL = 'manage/major/all',
  MAJOR_LIST_URL = 'manage/major/list',
  MAJOR_ADD_URL = 'manage/major/add',
  MAJOR_GET_ID_URL = 'manage/major/find',
  MAJOR_UPDATE_URL = 'manage/major/update',
  MAJOR_DELETE_URL = 'manage/major/delete',
}
export const reqMajorAll = () => {
  return request.get<any, majorAllResponseData>(API.MAJOR_ALL_URL)
}
export const reqMajorList = (data: majorListFormData) => {
  return request.post<any, majorListResponseData>(API.MAJOR_LIST_URL, data)
}
export const reqMajorAdd = (data: majorInfoData) => {
  return request.post<any, majorResponseData>(API.MAJOR_ADD_URL, data)
}
export const reqMajorByID = (_id: string) => {
  return request.get<any, majorResponseData>(
    API.MAJOR_GET_ID_URL + `?_id=${_id}`,
  )
}
export const reqMajorUpdate = (data: majorInfoData) => {
  return request.post<any, majorResponseData>(API.MAJOR_UPDATE_URL, data)
}
export const reqMajorDelete = (majorId: string) => {
  return request.post<any, majorResponseData>(API.MAJOR_DELETE_URL, { majorId })
}
