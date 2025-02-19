import request from '@/utils/request'
import type { getRoleListResponseData, roleInfoData } from './type'

export const getRoleList = () =>
  request.get<any, getRoleListResponseData>('/manage/role/list')

export const addRole = (data: roleInfoData) =>
  request.post<any, getRoleListResponseData>('/manage/role/add', data)

export const updateRole = (data: roleInfoData) =>
  request.post<any, getRoleListResponseData>('/manage/role/update', data)
