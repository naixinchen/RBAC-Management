import { defineStore } from 'pinia'
import {
  reqLogin,
  reqUserAdd,
  reqUserAll,
  reqUserById,
  reqUserDelete,
  reqUserList,
  reqUserUpdate,
} from '@/api/user'
import type {
  loginFormData,
  loginResponseData,
  userInfoData,
  userListFormData,
  userListResponseData,
  userAllResponseData,
} from '@/api/user/type'
import { UserState } from './types/type'
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // token: localStorage.getItem("VUE3-TOKEN")
      user: JSON.parse(localStorage.getItem('VUE3-USER') as string),
      users: [],
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      const result: any = await reqLogin(data)
      if (result.status === 0) {
        // this.token = (result.data.token as string)
        // localStorage.setItem("VUE3-TOKEN", (result.data.token as string))
        this.user = result.data as userInfoData
        localStorage.setItem('VUE3-USER', JSON.stringify(result.data) as string)
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    removeUser() {
      this.user = null
      localStorage.removeItem('VUE3-USER')
    },
    async getUserAll() {
      const result: userAllResponseData = await reqUserAll()
      console.log('geyUserAll', result)
      if (result.status === 0) {
        this.users = result.data
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getUserList(data: userListFormData) {
      const result: userListResponseData = await reqUserList(data)
      console.log('getUserList', result)
      if (result.status === 0) {
        this.users = result.data?.data as userInfoData[]
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async addUser(data: userInfoData) {
      const result: loginResponseData = await reqUserAdd(data)
      console.log('addUser', result)

      // status 当他的值为0时 成功
      if (result.status === 0) {
        // this.users=result.data
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async getUserById(_id: string) {
      const result: loginResponseData = await reqUserById(_id)
      // status 当他的值为0时 成功
      if (result.status === 0) {
        return result.data
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async updateUser(data: userInfoData) {
      const result: loginResponseData = await reqUserUpdate(data)
      // status 当他的值为0时 成功
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async deleteUser(userId: string) {
      const result: loginResponseData = await reqUserDelete(userId)
      if (result.status === 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
})

export default useUserStore
