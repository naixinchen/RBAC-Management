import request from '@/utils/request'
import type {
  schoolInfoData,
  schoolListFormData,
  schoolAllResponseData,
  schoolListResponseData,
  schoolResponseData,
} from './type'

enum API {
  SCHOOL_ALL_URL = 'manage/school/all',
  SCHOOL_LIST_URL = 'manage/school/list',
  SCHOOL_ADD_URL = 'manage/school/add',
  SCHOOL_GET_ID_URL = 'manage/school/find',
  SCHOOL_UPDATE_URL = 'manage/school/update',
  SCHOOL_DELETE_URL = 'manage/school/delete',
}
export const reqSchoolAll = () => {
  return request.get<any, schoolAllResponseData>(API.SCHOOL_ALL_URL)
}
export const reqSchoolList = (data: schoolListFormData) => {
  return request.post<any, schoolListResponseData>(API.SCHOOL_LIST_URL, data)
}
export const reqSchoolAdd = (data: schoolInfoData) => {
  return request.post<any, schoolResponseData>(API.SCHOOL_ADD_URL, data)
}
export const reqSchoolByID = (_id: string) => {
  return request.get<any, schoolResponseData>(
    API.SCHOOL_GET_ID_URL + `?_id=${_id}`,
  )
}
export const reqSchoolUpdate = (data: schoolInfoData) => {
  return request.post<any, schoolResponseData>(API.SCHOOL_UPDATE_URL, data)
}
export const reqSchoolDelete = (schoolId: string) => {
  return request.post<any, schoolResponseData>(API.SCHOOL_DELETE_URL, {
    schoolId,
  })
}
