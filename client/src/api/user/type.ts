//登录提供的数据
export interface loginFormData {
  username: string
  password: string
}
// //返回的数据类型--token
// export interface dataType {
//     token?: string | null
// }
//登录返回的数据类型
export interface loginResponseData {
  status: number
  data?: userInfoData
  msg?: string
}
//角色数据的类型
interface userRoleData {
  _id?: string
  name?: string
  menus: string[]
  create_time?: number
  __v?: number
  auth_time: number
  auth_name: string
}
//用户的信息
export interface userInfoData {
  token?: string
  _id?: string
  username: string
  name: string
  password: string
  phone?: string
  role_id?: string
  create_time: number
  __v: number
  role: userRoleData
}
// //用户返回的信息
// export interface userInfoResponseData{
//     status:number,
//     data:userInfoData
// }

//校验修改密码携带的参数类型
export interface pwdData {
  userId: string
  password: string
}
//修改返回的类型
export interface checkPwdResponseData {
  status: number
  data: userInfoData
  msg?: string
}
//获取用户列表的TS
export interface userListFormData {
  page: number
  size: number
}
//获取所有的用户
export interface userAllResponseData {
  status: number
  data: userInfoData[]
  msg?: string
}
//获取用户列表的返回
export interface userListResponseData {
  status: number
  data?: userListData
  msg?: string
}
interface userListData {
  data: userInfoData[]
  roles: []
  total: number
}
