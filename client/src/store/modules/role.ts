import { defineStore } from 'pinia'
import { RoleState } from './types/type'
import { addRole, getRoleList, updateRole } from '@/api/role'
import type { getRoleListResponseData, roleInfoData } from '@/api/role/type'

const useRoleStore = defineStore('Role', {
  state: (): RoleState => {
    return {
      roles: [],
    }
  },
  actions: {
    async roleList() {
      const result: getRoleListResponseData = await getRoleList()
      if (result.status === 0) {
        this.roles = result.data
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async useAddRole(data: roleInfoData) {
      const result: getRoleListResponseData = await addRole(data)
      if (result.status == 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
    async useUpdateRole(data: roleInfoData) {
      const result: getRoleListResponseData = await updateRole(data)
      if (result.status == 0) {
        return 'OK'
      } else {
        return Promise.reject(new Error(result.msg))
      }
    },
  },
})

export default useRoleStore
